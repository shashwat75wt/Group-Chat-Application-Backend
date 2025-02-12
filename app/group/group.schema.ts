import mongoose, { Schema, Document } from "mongoose";
import { type IGroup } from "./group.dto";

/**
 * Mongoose schema for the Group model.
 * Represents a collection of users with an admin, members, and optional invitations.
 */
const GroupSchema = new Schema<IGroup>(
  {
    /**
     * The name of the group.
     */
    name: { type: String, required: true, trim: true },

    /**
     * Type of the group - either "public" or "private".
     */
    type: { type: String, enum: ["public", "private"], required: true },

    /**
     * The admin (creator) of the group.
     * References the "User" collection.
     */
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    /**
     * Array of members who have joined the group.
     * Each member references the "User" collection.
     */
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    /**
     * List of invitations sent to users.
     * Each invitation includes the invited user's ID, a token, and an expiration date.
     */
    inviteToken: [
      {
        /**
         * The ID of the user who received the invitation.
         * References the "User" collection.
         */
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        /**
         * Unique token assigned to the invitation.
         */
        token: { type: String, required: true },

        /**
         * Expiration date of the invitation.
         */
        expiresAt: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

/**
 * Group model based on the GroupSchema.
 */
export default mongoose.model<IGroup>("Group", GroupSchema);
