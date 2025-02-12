import * as groupService from "./group.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import createHttpError from "http-errors";
import { IUser } from "../user/user.dto";

interface IUserWithoutPassword extends Omit<IUser, "password"> {}

/**
 * Fetches all public groups available.
 *
 * @route GET /groups/public
 * @access Public
 */
export const fetchPublicGroups = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await groupService.getPublicGroups();
    res.send(createResponse(result, "Successfully retrieved public groups."));
  }
);

/**
 * Creates a new group.
 *
 * @route POST /groups
 * @access Private (Authenticated users only)
 */
export const createNewGroup = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401, "Unauthorized");

  const result = await groupService.createGroup(
    req.user as IUserWithoutPassword,
    req.body
  );

  res.send(createResponse(result, "New group has been created successfully."));
});

/**
 * Allows a user to join a public group.
 *
 * @route POST /groups/:groupId/join
 * @access Private (Authenticated users only)
 */
export const joinPublicGroup = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401, "Unauthorized");

  const result = await groupService.joinPublicGroup(
    req.user as IUserWithoutPassword,
    req.params.groupId
  );

  res.send(createResponse(result, "You have successfully joined the group."));
});

/**
 * Creates an invitation for a user to join a group.
 *
 * @route POST /groups/:groupId/invite/:userId
 * @access Private (Authenticated users only)
 */
export const createNewInvitation = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401, "Unauthorized");

  const result = await groupService.createInvitation(
    req.user as IUserWithoutPassword,
    req.params.groupId,
    req.params.userId
  );

  res.send(createResponse(result, "Invitation has been sent successfully."));
});

/**
 * Accepts an invitation to join a group.
 *
 * @route POST /groups/invite/:token
 * @access Public (Accessible via token)
 */
export const acceptInvite = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupService.acceptInvitation(req.params.token, req.body);

  res.send(createResponse(result, "You have successfully accepted the invitation."));
});

/**
 * Fetches analytics for the authenticated user.
 *
 * @route GET /groups/analytics
 * @access Private (Authenticated users only)
 */
export const data = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupService.analytics(req.user as IUserWithoutPassword);

  res.send(createResponse(result, "User analytics data retrieved successfully."));
});

/**
 * Fetches analytics for a specific group.
 *
 * @route GET /groups/:groupId/analytics
 * @access Private (Authenticated users only)
 */
export const groupdata = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupService.groupAnalytics(req.params.groupId);

  res.send(createResponse(result, "Group analytics data retrieved successfully."));
});

/**
 * Updates details of an existing group.
 *
 * @route PUT /groups/:groupId
 * @access Private (Authenticated users only)
 */
export const editGroup = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupService.editGroup(req.params.groupId, req.body);

  res.send(createResponse(result, "Group details updated successfully."));
});
