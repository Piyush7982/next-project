const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    image: {
      type: String,
      default: "/default-avatar.png",
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["Buyer", "Seller", "Admin"],
      default: "Buyer",
      required: true,
    },
    mobile: {
      type: String,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    college: {
      type: String,
    },
    address: {
      type: String,
    },
    registrationCompleted: {
      type: Boolean,
      default: false,
    },
    ratings: {
      type: [
        {
          userId: { type: Schema.Types.ObjectId, ref: "users" },
          rating: { type: Number, min: 1, max: 5 },
          review: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "stationary",
      },
    ],
    permissions: {
      type: [String],
      default: [],
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpiry: Date,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ college: 1 });

// Virtual for getting user's full profile URL
userSchema.virtual("profileUrl").get(function () {
  return `/profile/${this.username}`;
});

// Method to update average rating
userSchema.methods.updateAverageRating = async function () {
  const ratings = this.ratings;
  if (ratings.length === 0) {
    this.averageRating = 0;
    return;
  }
  const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  this.averageRating = sum / ratings.length;
  await this.save();
};

export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
