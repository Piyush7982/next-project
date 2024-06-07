const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const approvalSchema = new Schema(
  {
    onModel: {
      type: String,
      enum: ["stationaries", "flats"],
      required: true,
    },
    Model: {
      type: Schema.Types.ObjectId,
      refPath: "onModel",
      required: true,
    },

    approvalStatus: {
      type: String,
      enum: ["Approved", "Pending", "Declined"],
      default: "Pending",
    },

    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export const Approval =
  mongoose.models.approvals || mongoose.model("approvals", approvalSchema);
