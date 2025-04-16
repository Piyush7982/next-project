"use server";

import { connectToDb } from "@/lib/db";
import { Message } from "@/lib/models/message.schema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

/**
 * Send a message to another user regarding a listing
 */
export async function sendMessage(receiverId, listingId, content) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: "Authentication required" };
    }

    await connectToDb();

    const message = await Message.create({
      senderId: session.user.id,
      receiverId,
      listingId,
      content: content.trim(),
    });

    revalidatePath("/messages");
    return { success: true, message: "Message sent successfully" };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, message: "Failed to send message" };
  }
}

/**
 * Get all messages for the current user
 */
export async function getUserMessages() {
  try {
    const session = await auth();
    if (!session?.user) {
      return [];
    }

    await connectToDb();

    const messages = await Message.find({
      $or: [{ senderId: session.user.id }, { receiverId: session.user.id }],
    })
      .sort({ createdAt: -1 })
      .populate("senderId", "name username")
      .populate("receiverId", "name username")
      .populate("listingId", "title itemType")
      .lean();

    if (!messages) return [];

    return messages.map((message) => ({
      ...message,
      _id: message._id.toString(),
      senderId: message.senderId
        ? {
            ...message.senderId,
            _id: message.senderId._id.toString(),
          }
        : null,
      receiverId: message.receiverId
        ? {
            ...message.receiverId,
            _id: message.receiverId._id.toString(),
          }
        : null,
      listingId: message.listingId
        ? {
            ...message.listingId,
            _id: message.listingId._id.toString(),
          }
        : null,
    }));
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

/**
 * Get unread message count for the current user
 */
export async function getUnreadMessagesCount(userId) {
  if (!userId) return 0;

  try {
    await connectToDb();
    return await Message.countDocuments({
      receiverId: userId,
      isRead: false,
    });
  } catch (error) {
    console.error("Error counting unread messages:", error);
    return 0;
  }
}

/**
 * Mark a message as read
 */
export async function markMessageAsRead(messageId) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: "Authentication required" };
    }

    await connectToDb();

    const message = await Message.findOneAndUpdate(
      {
        _id: messageId,
        receiverId: session.user.id,
      },
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return { success: false, message: "Message not found" };
    }

    revalidatePath("/messages");
    return { success: true, message: "Message marked as read" };
  } catch (error) {
    console.error("Error marking message as read:", error);
    return { success: false, message: "Failed to mark message as read" };
  }
}

/**
 * Get conversation between two users for a specific listing
 */
export async function getListingConversation(listingId, otherUserId) {
  try {
    const session = await auth();
    if (!session?.user) {
      return [];
    }

    await connectToDb();

    const messages = await Message.find({
      listingId,
      $or: [
        { senderId: session.user.id, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: session.user.id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "name username")
      .populate("receiverId", "name username")
      .lean();

    return messages.map((message) => ({
      ...message,
      _id: message._id.toString(),
      senderId: message.senderId
        ? {
            ...message.senderId,
            _id: message.senderId._id.toString(),
          }
        : null,
      receiverId: message.receiverId
        ? {
            ...message.receiverId,
            _id: message.receiverId._id.toString(),
          }
        : null,
    }));
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return [];
  }
}
