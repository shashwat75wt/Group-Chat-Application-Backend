import Group from "./group.schema";
import crypto from "crypto";
import { type IUser } from "../user/user.dto";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { getUserByEmail, updateUserGroup } from "../user/user.service";

interface IUserWithoutPassword extends Omit<IUser, "password"> {}

/**
 * Fetch all public groups.
 * @returns {Promise<IGroup[]>} List of public groups.
 */
export const getPublicGroups = async () => {
  return await Group.find({ type: "public" });
};

/**
 * Create a new group.
 * @param {IUserWithoutPassword} user - The user creating the group.
 * @param {Object} data - Data for the new group.
 * @param {string} data.name - The name of the group.
 * @param {string} data.type - The type of the group (public/private).
 * @returns {Promise<IGroup>} The created group.
 */
export const createGroup = async (
  user: IUserWithoutPassword,
  data: { name: string; type: string }
) => {
  if (!user) throw createHttpError(401, "Unauthorized");

  const group = new Group({
    name: data.name,
    type: data.type,
    admin: user._id,
    members: [user._id],
  });

  const savedGroup = await group.save();
  await updateUserGroup(user._id, savedGroup._id);

  return savedGroup;
};

/**
 * Join a public group.
 * @param {IUserWithoutPassword} user - The user joining the group.
 * @param {string} groupId - The ID of the group to join.
 * @returns {Promise<{ message: string }>} Success message.
 */
export const joinPublicGroup = async (
  user: IUserWithoutPassword,
  groupId: string
) => {
  if (!user) throw createHttpError(401, "Unauthorized");

  const group = await Group.findById(groupId);
  if (!group) throw createHttpError(404, "This Group is not found");

  if (group.type !== "public")
    throw createHttpError(400, "You Cannot join a private group directly");

  const userIdObject = new mongoose.Types.ObjectId(user._id);
  if (group.members.includes(userIdObject))
    throw createHttpError(400, "Already a member");

  group.members.push(userIdObject);
  await group.save();
  await updateUserGroup(user._id, group._id);

  return { message: "Joined the group successfully" };
};

/**
 * Create an invitation link for a private group.
 * @param {IUserWithoutPassword} user - The admin user creating the invitation.
 * @param {string} groupId - The ID of the group to invite to.
 * @param {string} userId - The ID of the user being invited.
 * @returns {Promise<{ frontendLink: string, invitationLink: string }>} Invitation links.
 */
export const createInvitation = async (
  user: IUserWithoutPassword,
  groupId: string,
  userId: string
) => {
  if (!user) throw createHttpError(401, "Unauthorized");

  const group = await Group.findById(groupId);
  if (!group) throw createHttpError(404, "Group not found");

  if (group.admin.toString() !== user._id.toString()) {
    throw createHttpError(403, "Only the admin can invite users");
  }

  const userIdObject = new mongoose.Types.ObjectId(userId);
  if (group.members.includes(userIdObject))
    throw createHttpError(400, "Already a member");

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // Expires in 24 hours

  group.inviteToken?.push({ userId: userIdObject, token, expiresAt });
  await group.save();

  return {
    frontendLink: "dummy.com",
    invitationLink: `/api/groups/accept-invitation/${token}`,
  };
};

/**
 * Accept an invitation to a private group.
 * @param {string} token - The invitation token.
 * @param {Object} data - Data for accepting the invitation.
 * @param {string} data.email - The email of the user accepting the invitation.
 * @returns {Promise<{ message: string }>} Success message.
 */
export const acceptInvitation = async (
  token: string,
  data: { email: string }
) => {
  const user = await getUserByEmail(data.email);
  if (!user) throw createHttpError(401, "Unauthorized");

  const group = await Group.findOne({ "inviteToken.token": token });
  if (!group) throw createHttpError(404, "Invalid or expired invitation");

  const invitation = group.inviteToken?.find((inv) => inv.token === token);
  if (!invitation || new Date() > invitation.expiresAt) {
    throw createHttpError(400, "Invitation expired");
  }

  if (invitation.userId.toString() !== user._id.toString()) {
    throw createHttpError(403, "You are not authorized to use this invitation");
  }

  const userIdObject = new mongoose.Types.ObjectId(user._id);
  if (group.members.includes(userIdObject)) {
    throw createHttpError(400, "You are already a member of this group");
  }

  group.members.push(userIdObject);
  group.inviteToken =
    group.inviteToken?.filter((inv) => inv.token !== token) ?? [];

  await group.save();
  await updateUserGroup(user._id, group._id);

  return { message: "Joined the group successfully" };
};

/**
 * Fetch analytics for a user.
 * @param {IUserWithoutPassword} user - The user whose analytics are to be fetched.
 * @returns {Promise<{ totalGroupsCreated: number, groupUserCounts: { groupId: string, name: string, totalMembers: number }[] }>} Group analytics data.
 */
export const analytics = async (user: IUserWithoutPassword) => {
  const userId = user?._id;
  if (!userId) throw createHttpError(401, "Unauthorized");

  const totalGroupsCreated = await Group.countDocuments({ admin: userId });
  const groups = await Group.find({ admin: userId }).select("name members");

  const groupUserCounts = groups.map((group) => ({
    groupId: group._id,
    name: group.name,
    totalMembers: group.members.length,
  }));

  return { totalGroupsCreated, groupUserCounts };
};

/**
 * Check if a user is a member of a specific group.
 * @param {string} groupId - The group ID to check.
 * @param {string} userId - The user ID to check.
 * @returns {Promise<boolean>} True if the user is a member, false otherwise.
 */
export const checkUserExistInGroup = async (
  groupId: string,
  userId: string
) => {
  const group = await Group.findById(groupId);
  if (!group) throw new Error("Group not found");

  return group.members.some((member) => member.toString() === userId);
};
