import * as messageService from "./message.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import createHttpError from "http-errors";
import { IUser } from "../user/user.dto";

interface IUserWithoutPassword extends Omit<IUser, "password"> {}

/**
 * Controller function to create a new message.
 * This handler calls the message service to create a message.
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The response object used to send back the message response.
 */
export const createMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await messageService.createMessage(req.user as IUserWithoutPassword, req.body);
    res.send(createResponse(result, "Message sent successfully"));
  }
);

/**
 * Controller function to get all messages for the logged-in user.
 * This handler calls the message service to fetch all messages.
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The response object used to send back the messages.
 */
export const getAllMessages = asyncHandler(
  async (req: Request, res: Response) => {
    const messages = await messageService.getAllMessages(req.user as IUserWithoutPassword, req.body);
    res.send(createResponse(messages, "Messages fetched successfully"));
  }
);
