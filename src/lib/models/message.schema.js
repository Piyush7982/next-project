const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "conversation",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, "Message cannot be more than 1000 characters"],
    },
    type: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },
    attachments: [
      {
        url: String,
        type: String,
        name: String,
        size: Number,
      },
    ],
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    deletedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ sender: 1, receiver: 1 });
messageSchema.index({ isRead: 1 });

// Pre-save middleware to handle message updates
messageSchema.pre("save", function (next) {
  if (this.isModified("isRead") && this.isRead) {
    this.readAt = new Date();
  }
  next();
});

export const Message =
  mongoose.models.message || mongoose.model("message", messageSchema);

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "message",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "stationary",
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    archivedBy: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        archivedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for conversation schema
conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessage: 1 });
conversationSchema.index({ product: 1 });

export const Conversation =
  mongoose.models.conversation ||
  mongoose.model("conversation", conversationSchema);
