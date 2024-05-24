import { User } from "./user.schema";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stationarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: { type: String },
    description: {
      type: String,
      required: true,
    },
    approvalStatus: {
      type: String,
      enum: ["Approved", "Pending", "Declined"],
      default: "Pending",
    },
    recommendedFor: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],

    available: {
      type: Boolean,
      default: true,
    },
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

// const Stationary = mongoose.model('Stationary', stationarySchema);

// export { Stationary };

export const Stationary =
  mongoose.models.stationaries ||
  mongoose.model("stationaries", stationarySchema);
