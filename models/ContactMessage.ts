// models/ContactMessage.ts
import mongoose, { Schema, model, models } from "mongoose";

export interface IContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: Date;
}

const contactSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactMessage = models.ContactMessage || model<IContactMessage>("ContactMessage", contactSchema);
export default ContactMessage;