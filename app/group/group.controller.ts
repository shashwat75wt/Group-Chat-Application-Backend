import * as groupService from "./group.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import createHttpError from "http-errors";
import { IUser } from "../user/user.dto";

// Interface to define a user without a password field
interface IUserWithoutPassword extends Omit<IUser, "password"> {}

/**
 * Retrieves all public groups.
 * 
 * @async
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} Sends the response with the list of public groups.
 */
export const getPublicGroups = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await groupService.getPublicGroups();
    res.send(createResponse(result, "Successfully fetched the public group"));
  }
);

/**
 * Creates a new group.
 * 
 * @async
 * @function
 * @param {Request} req - The request object containing user data and group info.
 * @param {Response} res - The response object.
 * @throws {createHttpError} 401 Unauthorized if the user is not authenticated.
 * @returns {Promise<void>} Sends the response with the created group information.
 */
export const createGroup = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401, "Unauthorized");

  const result = await groupService.createGroup(
    req.user as IUserWithoutPassword,
    req.body
  );
  res.send(createResponse(result, "Group created successfully!!!!"));
});

/**
 * Allows a user to join a public group.
 * 
 * @async
 * @function
 * @param {Request} req - The request object containing user and group information.
 * @param {Response} res - The response object.
 * @throws {createHttpError} 401 Unauthorized if the user is not authenticated.
 * @param {string} req.params.groupId - The ID of the group to join.
 * @returns {Promise<void>} Sends the response indicating the group join status.
 */
export const joinPublicGroup = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw createHttpError(401, "Unauthorized");

    const result = await groupService.joinPublicGroup(
      req.user as IUserWithoutPassword,
      req.params.groupId
    );
    res.send(createResponse(result, `Joined ${result} group successfully`));
  }
);

/**
 * Creates an invitation for a user to join a specific group.
 * 
 * @async
 * @function
 * @param {Request} req - The request object containing user and invitation details.
 * @param {Response} res - The response object.
 * @throws {createHttpError} 401 Unauthorized if the user is not authenticated.
 * @param {string} req.params.groupId - The ID of the group to invite the user to.
 * @param {string} req.params.userId - The ID of the user to invite.
 * @returns {Promise<void>} Sends the response indicating the invitation status.
 */
export const createInvitation = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw createHttpError(401, "Unauthorized");

    const result = await groupService.createInvitation(
      req.user as IUserWithoutPassword,
      req.params.groupId,
      req.params.userId
    );
    res.send(createResponse(result, "Invitation created successfully"));
  }
);

/**
 * Accepts an invitation to join a group.
 * 
 * @async
 * @function
 * @param {Request} req - The request object containing the invitation token and data.
 * @param {Response} res - The response object.
 * @param {string} req.params.token - The token associated with the invitation.
 * @returns {Promise<void>} Sends the response indicating the invitation acceptance.
 */
export const acceptInvitation = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await groupService.acceptInvitation(
      req.params.token,
      req.body
    );
    res.send(createResponse(result, "Invitation accepted successfully"));
  }
);

/**
 * Fetches analytics data for a user.
 * 
 * @async
 * @function
 * @param {Request} req - The request object containing the user data.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} Sends the response with the fetched analytics data.
 */
export const analytics = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await groupService.analytics(
      req.user as IUserWithoutPassword
    );
    res.send(createResponse(result, "Analytics fetched successfully"));
  }
);
