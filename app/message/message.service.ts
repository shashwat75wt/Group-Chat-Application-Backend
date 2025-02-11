import Message from "./message.schema";
import { type IUser } from "../user/user.dto";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { checkUserExistInGroup } from "../group/group.service";

// User interface without the password field
interface IUserWithoutPassword extends Omit<IUser, "password"> {}

/**
 * Creates a new message in a group.
 * First checks if the user is a member of the group, then creates and saves the message.
 * 
 * @param user - The user sending the message. Should not have the password field.
 * @param data - The data for the new message.
 * @param data.content - The content of the message.
 * @param data.groupId - The ID of the group where the message will be sent.
 * 
 * @throws {HttpError} 401 - If the user is not authorized.
 * @throws {HttpError} 400 - If the user is not in the group.
 * 
 * @returns The saved message document.
 */
export const createMessage = async (
  user: IUserWithoutPassword,
  data: {
    content: string;
    groupId: string;
  }
) => {
  if (!user) throw createHttpError(401, "Unauthorized");

  // Check if the user is part of the group
  const isUserExistInGroup = await checkUserExistInGroup(
    data.groupId,
    user._id
  );
  if (!isUserExistInGroup)
    throw createHttpError(400, "User is not in the group");

  // Create a new message document
  const message = new Message({
    groupId: data.groupId,
    senderId: user._id,
    content: data.content,
  });

  // Save and return the message
  return await message.save();
};

/**
 * Fetches all messages from a specific group.
 * 
 * @param user - The user requesting the messages. Should not have the password field.
 * @param data - The data for fetching messages.
 * @param data.groupId - The ID of the group from which messages will be fetched.
 * 
 * @throws {HttpError} 401 - If the user is not authorized.
 * 
 * @returns An array of messages from the specified group, sorted by creation date.
 */
export const getAllMessages = async (
  user: IUserWithoutPassword,
  data: {
    groupId: string;
  }
) => {
  if (!user) throw createHttpError(401, "Unauthorized");

  // Fetch and return messages from the specified group, sorted by creation time
  return await Message.find({ groupId: data.groupId }).sort({ createdAt: 1 });
};
