import mongoose, { Schema, Document } from "mongoose";
import { type IMessage } from "./message.dto"; 

/**
 * Mongoose schema for the Message model.
 * Defines the structure of a message document in the database.
 */
const MessageSchema = new Schema<IMessage>(
  {
    /**
     * The ID of the group where the message was sent.
     * Refers to the "Group" model.
     * @type {mongoose.Schema.Types.ObjectId}
     */
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },

    /**
     * The ID of the user who sent the message.
     * Refers to the "User" model.
     * @type {mongoose.Schema.Types.ObjectId}
     */
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    /**
     * The content of the message.
     * @type {string}
     */
    content: { type: String, required: true },
  },
  { timestamps: true } // Automatically includes createdAt and updatedAt fields
);

/**
 * Mongoose model for the Message schema.
 * Used to interact with the "messages" collection in the database.
 */
export default mongoose.model<IMessage>("Message", MessageSchema);
