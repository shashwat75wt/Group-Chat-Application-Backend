import mongoose, { Schema, Document } from "mongoose";
import { type IMessage } from "./message.dto"; 

/**
 * Mongoose schema for storing messages in a group chat.
 */
const MessageSchema = new Schema<IMessage>(
  {
    /**
     * The ID of the group where the message was sent.
     * References the "Group" collection.
     */
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },

    /**
     * The ID of the user who sent the message.
     * References the "User" collection.
     */
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    /**
     * The actual text content of the message.
     */
    content: { type: String, required: true },
  },
  {
    /**
     * Automatically adds `createdAt` and `updatedAt` timestamps.
     */
    timestamps: true,
  }
);

/**
 * Mongoose model for the Message schema.
 * 
 * This model is used to interact with the "Message" collection in the database.
 */
export default mongoose.model<IMessage>("Message", MessageSchema);
