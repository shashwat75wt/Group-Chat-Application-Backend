import { body, param } from "express-validator";

/**
 * Validator for creating a group.
 * Ensures that the name and type fields are provided and are strings.
 */
export const createGroup = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),
  body("type")
    .notEmpty()
    .withMessage("type is required")
    .isString()
    .withMessage("type must be a string"),
];

/**
 * Validator for joining a public group.
 * Ensures that the group ID is provided and is a string.
 */
export const joinPublicGroup = [
  param("groupId")
    .notEmpty()
    .withMessage("ID is required")
    .isString()
    .withMessage("ID must be a string"),
];

/**
 * Validator for creating an invitation.
 * Ensures that the group ID and user ID are provided and are strings.
 */
export const createInvitation = [
  param("groupId")
    .notEmpty()
    .withMessage("ID is required")
    .isString()
    .withMessage("ID must be a string"),
  param("userId")
    .notEmpty()
    .withMessage("ID is required")
    .isString()
    .withMessage("ID must be a string"),
];

/**
 * Validator for accepting an invitation.
 * Ensures that email, password, and token are provided and are strings.
 */
export const acceptInvitation = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email must be a string"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string"),
  param("token")
    .notEmpty()
    .withMessage("token is required")
    .isString()
    .withMessage("token must be a string"),
];
