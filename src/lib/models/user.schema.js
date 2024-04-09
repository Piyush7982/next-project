const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Buyer", "Seller", "Admin"],
      default: "Buyers",
    },
    mobile: {
      type: Number,
      default: " ",
    },
    college: {
      type: String,
      default: " ",
    },
    address: {
      type: String,
      default: " ",
    },
    registrationCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
