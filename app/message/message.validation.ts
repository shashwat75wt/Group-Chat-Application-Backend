import { body } from "express-validator";

/**
 * Validation rules for creating a message.
 * Ensures that content and groupId are present and correctly formatted.
 */
export const createMessage = [
  /**
   * Validates the content of the message.
   * - Checks if the content is not empty.
   * - Ensures the content is a string.
   * 
   * @throws {ValidationError} If the content is empty or not a string.
   */
  body("content")
    .notEmpty()
    .withMessage("content is required")
    .isString()
    .withMessage("content must be a string"),

  /**
   * Validates the groupId for the message.
   * - Checks if the groupId is not empty.
   * - Ensures the groupId is a string.
   * 
   * @throws {ValidationError} If the groupId is empty or not a string.
   */
  body("groupId")
    .notEmpty()
    .withMessage("groupId is required")
    .isString()
    .withMessage("groupId must be a string"),
];

/**
 * Validation rules for fetching all messages from a specific group.
 * Ensures that the groupId is present and correctly formatted.
 */
export const getAllMessages = [
  /**
   * Validates the groupId for fetching messages.
   * - Checks if the groupId is not empty.
   * - Ensures the groupId is a string.
   * 
   * @throws {ValidationError} If the groupId is empty or not a string.
   */
  body("groupId")
    .notEmpty()
    .withMessage("groupId is required")
    .isString()
    .withMessage("groupId must be a string"),
];
