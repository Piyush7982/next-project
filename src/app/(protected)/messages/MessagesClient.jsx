"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export default function MessagesClient({ initialMessages, session }) {
  const [messages, setMessages] = useState(initialMessages);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-900/50 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Messages
          </h1>
        </div>

        {messages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-center">
                No messages yet. When you contact advertisers or receive
                messages, they will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isIncoming = message.receiverId._id === session.user.id;
              const otherUser = isIncoming
                ? message.senderId
                : message.receiverId;

              return (
                <Card
                  key={message._id}
                  className={`transition-colors ${
                    !message.isRead && isIncoming
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">
                          {isIncoming ? "From" : "To"}: {otherUser.name}
                        </CardTitle>
                        <CardDescription>
                          {formatDistanceToNow(new Date(message.createdAt), {
                            addSuffix: true,
                          })}
                        </CardDescription>
                      </div>
                      <Link
                        href={`/listing/${message.listingId._id}`}
                        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                      >
                        View Listing
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {message.listingId.itemType}
                        </Badge>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {message.listingId.title}
                        </span>
                      </div>
                      <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
