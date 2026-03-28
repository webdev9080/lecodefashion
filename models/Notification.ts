// models/Notification.ts
import { Schema, model, models } from "mongoose";

const notificationSchema = new Schema(
  {
    title: String,
    message: String,
    type: {
      type: String,
      enum: ["announcement", "promotion", "update"],
      default: "announcement",
    },
    isGlobal: {
      type: Boolean,
      default: true, // pour tous les utilisateurs
    },
  },
  { timestamps: true }
);

const Notification =
  models.Notification || model("Notification", notificationSchema);

export default Notification;