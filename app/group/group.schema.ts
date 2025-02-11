import mongoose, { Schema, Document } from "mongoose";
import { type IGroup } from "./group.dto";

/**
 * Mongoose schema for a Group.
 * 
 * @type {Schema<IGroup>} Defines the schema for the Group model, mapping the fields to MongoDB data types.
 * @property {string} name - The name of the group (required).
 * @property {"public" | "private"} type - The type of the group, either "public" or "private" (required).
 * @property {mongoose.Schema.Types.ObjectId} admin - The user ID of the group admin (required).
 * @property {mongoose.Schema.Types.ObjectId[]} members - Array of user IDs representing the group members.
 * @property {Array<{userId: mongoose.Schema.Types.ObjectId, token: string, expiresAt: Date}>} inviteToken - An optional array of invitations, where each invitation contains a user ID, token, and expiration date.
 * @property {mongoose.Schema.Types.ObjectId[]} [joinRequests] - (Commented out) Array of user IDs representing users who have requested to join the group.
 * @property {Date} createdAt - The timestamp when the group was created (automatically managed by Mongoose).
 * @property {Date} updatedAt - The timestamp when the group was last updated (automatically managed by Mongoose).
 */
const GroupSchema = new Schema<IGroup>(
  {
    // The name of the group (required and trimmed to remove extra spaces)
    name: { type: String, required: true, trim: true },

    // The type of group, either 'public' or 'private' (required)
    type: { type: String, enum: ["public", "private"], required: true },

    // The user ID of the group admin (required)
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // An array of user IDs that represent the members of the group
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // An array of invitations, where each invitation contains userId, token, and expiration date
    inviteToken: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        token: { type: String, required: true },
        expiresAt: { type: Date, required: true },
      },
    ],

    // (Optional) An array of user IDs representing users who have requested to join the group
    // joinRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields to the schema
);

// Exporting the Group model based on the schema
export default mongoose.model<IGroup>("Group", GroupSchema);
