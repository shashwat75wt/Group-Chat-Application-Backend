import Message from "./message.schema";
import { type IUser } from "../user/user.dto";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { checkUserExistInGroup, isGroupExist } from "../group/group.service";
import { IGroup } from "../group/group.dto";

interface IUserWithoutPassword extends Omit<IUser, "password"> {}

/**
 * Creates and stores a new message within a specific group.
 *
 * @param {IUserWithoutPassword} user - The user sending the message.
 * @param {Object} data - The message details.
 * @param {string} data.content - The message text content.
 * @param {string} data.groupId - The ID of the group where the message is being sent.
 * @returns {Promise<IMessage>} - The saved message document.
 * @throws {createHttpError} - Throws an error if the user is unauthorized or not a member of the group.
 */
export const createMessage = async (
  user: IUserWithoutPassword,
  data: { content: string; groupId: string }
) => {
  // Ensure the user is authenticated
  if (!user) throw createHttpError(401, "Unauthorized");

  // Check if the user is a member of the specified group
  const isUserInGroup = await checkUserExistInGroup(data.groupId, user._id);
  if (!isUserInGroup)
    throw createHttpError(403, "User is not a member of this group");

  // Create a new message instance
  const message = new Message({
    groupId: data.groupId,
    senderId: user._id,
    content: data.content,
  });

  // Save and return the created message
  return await message.save();
};

/**
 * Retrieves all messages from a specific group.
 *
 * @param {IUserWithoutPassword} user - The user requesting the messages.
 * @param {Object} data - The group details.
 * @param {string} data.groupId - The ID of the group.
 * @returns {Promise<IMessage[]>} - An array of messages sorted by creation date.
 * @throws {createHttpError} - Throws an error if the user is unauthorized or the group does not exist.
 */
export const getAllMessages = async (
  user: IUserWithoutPassword,
  data: { groupId: string }
) => {
  // Ensure the user is authenticated
  if (!user) throw createHttpError(401, "Unauthorized");

  // Check if the group exists
  const groupExists = await isGroupExist(data.groupId);
  if (!groupExists) throw createHttpError(404, "Group not found");

  // Fetch and return all messages in the group, sorted by creation date
  return await Message.find({ groupId: data.groupId }).sort({ createdAt: 1 });
};

/**
 * Deletes all messages associated with a specific group.
 *
 * @param {string} groupId - The ID of the group whose messages should be deleted.
 * @returns {Promise<void>} - Resolves when the messages are successfully deleted.
 */
export const deleteMessageAssociateWithGroup = async (groupId: string) => {
  await Message.deleteMany({ groupId });
};
