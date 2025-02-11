import { type BaseSchema } from "../common/dto/base.dto";
import mongoose from "mongoose";

/**
 * Represents a message within a group.
 * Extends the BaseSchema with additional fields specific to a message.
 */
export interface IMessage extends BaseSchema {
  /**
   * The ID of the group where the message is sent.
   * @type {mongoose.Types.ObjectId}
   */
  groupId: mongoose.Types.ObjectId;

  /**
   * The ID of the user who sent the message.
   * @type {mongoose.Types.ObjectId}
   */
  senderId: mongoose.Types.ObjectId;

  /**
   * The content of the message being sent.
   * @type {string}
   */
  content: string;
}
