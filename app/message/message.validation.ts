import { body } from "express-validator";

/**
 * Validation rules for creating a new message.
 *
 * - Ensures the `content` field is provided and is a string.
 * - Ensures the `groupId` field is provided and is a string.
 */
export const createMessage = [
  body("content")
    .notEmpty()
    .withMessage("Content is required.")
    .isString()
    .withMessage("Content must be a string."),
  
  body("groupId")
    .notEmpty()
    .withMessage("Group ID is required.")
    .isString()
    .withMessage("Group ID must be a valid string."),
];

/**
 * Validation rules for retrieving all messages from a group.
 *
 * - Ensures the `groupId` field is provided and is a string.
 */
export const getAllMessages = [
  body("groupId")
    .notEmpty()
    .withMessage("Group ID is required.")
    .isString()
    .withMessage("Group ID must be a valid string."),
];
