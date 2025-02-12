import { type BaseSchema } from "../common/dto/base.dto";
import mongoose from "mongoose";

/**
 * Interface representing a message within a group.
 */
export interface IMessage extends BaseSchema {
    /**
     * The ID of the group where the message was sent.
     * References the "Group" collection.
     */
    groupId: mongoose.Types.ObjectId;

    /**
     * The ID of the user who sent the message.
     * References the "User" collection.
     */
    senderId: mongoose.Types.ObjectId;

    /**
     * The content of the message.
     */
    content: string;
}
