import * as messageService from "./message.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { IUser } from "../user/user.dto";

/**
 * Represents a user object without the password field.
 */
interface IUserWithoutPassword extends Omit<IUser, "password"> {}

/**
 * Controller to handle message creation.
 * 
 * - Requires authentication.
 * - Accepts message content in the request body.
 * - Sends a response with a success message.
 */
export const generateMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await messageService.createMessage(
      req.user as IUserWithoutPassword,
      req.body
    );

    res.send(createResponse(result, "Message has been sent successfully."));
  }
);

/**
 * Controller to fetch messages.
 * 
 * - Requires authentication.
 * - Fetches all messages based on user data.
 * - Sends a response with the retrieved messages.
 */
export const getMessages = asyncHandler(
  async (req: Request, res: Response) => {
    const messages = await messageService.getAllMessages(
      req.user as IUserWithoutPassword,
      req.body
    );

    res.send(createResponse(messages, "Messages retrieved successfully."));
  }
);
