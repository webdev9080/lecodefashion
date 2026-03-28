import mongoose, { Schema, models, model } from "mongoose";

const ReviewSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true, // 🔥 important pour performance
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔥 BONUS (utile plus tard)
    likes: {
      type: Number,
      default: 0,
    },

    // 🔥 Pour modération future
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // 🔥 createdAt + updatedAt auto
  }
);

// 🔥 Empêche les erreurs de re-compilation Next.js
const Review = models.Review || model("Review", ReviewSchema);

export default Review;