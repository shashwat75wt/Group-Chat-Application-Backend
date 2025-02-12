import { type BaseSchema } from "../common/dto/base.dto";
import mongoose from "mongoose";

/**
 * Represents an invitation for a user to join a group.
 */
interface Invitation {
  /**
   * The ID of the invited user.
   */
  userId: mongoose.Types.ObjectId;

  /**
   * Unique token used for accepting the invitation.
   */
  token: string;

  /**
   * Expiration date of the invitation.
   */
  expiresAt: Date;
}

/**
 * Represents a group entity in the system.
 */
export interface IGroup extends BaseSchema {
  /**
   * The name of the group.
   */
  name: string;

  /**
   * Type of group - either "public" or "private".
   */
  type: "public" | "private";

  /**
   * The ID of the admin who created and manages the group.
   */
  admin: mongoose.Types.ObjectId;

  /**
   * List of member IDs who are part of the group.
   */
  members: mongoose.Types.ObjectId[];

  /**
   * List of invitations for users to join the group (optional).
   */
  inviteToken?: Invitation[];
}
