import { type BaseSchema } from "../common/dto/base.dto";
import mongoose from "mongoose";

/**
 * Represents an invitation for a user to join a group.
 * 
 * @interface Invitation
 * @property {mongoose.Types.ObjectId} userId - The ID of the user to whom the invitation is sent.
 * @property {string} token - The unique invitation token.
 * @property {Date} expiresAt - The expiration date of the invitation.
 */
interface Invitation {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

/**
 * Represents a group in the system.
 * 
 * @interface IGroup
 * @extends {BaseSchema} - Inherits common schema properties from BaseSchema.
 * @property {string} name - The name of the group.
 * @property {"public" | "private"} type - The type of the group, can either be "public" or "private".
 * @property {mongoose.Types.ObjectId} admin - The ID of the group admin.
 * @property {mongoose.Types.ObjectId[]} members - An array of IDs representing the group members.
 * @property {Invitation[]} [inviteToken] - An optional array of invitations for users to join the group, each containing a token.
 * @property {mongoose.Types.ObjectId[]} [joinRequests] - (Commented out) An optional array of IDs representing users who have requested to join the group.
 */
export interface IGroup extends BaseSchema {
  name: string;
  type: "public" | "private";
  admin: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  inviteToken?: Invitation[];
  // joinRequests?: mongoose.Types.ObjectId[];
}
