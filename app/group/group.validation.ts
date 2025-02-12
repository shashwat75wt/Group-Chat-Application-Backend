import { body, param } from "express-validator";

/**
 * Validation rules for creating a new group.
 * 
 * - `name`: Required, must be a string.
 * - `type`: Required, must be a string.
 */
export const createGroup = [
  body("name")
    .notEmpty()
    .withMessage("Group name is required")
    .isString()
    .withMessage("Group name must be a string"),
  body("type")
    .notEmpty()
    .withMessage("Group type is required")
    .isString()
    .withMessage("Group type must be a string"),
];

/**
 * Validation rules for joining a public group.
 * 
 * - `groupId`: Required, must be a string.
 */
export const joinPublicGroup = [
  param("groupId")
    .notEmpty()
    .withMessage("Group ID is required")
    .isString()
    .withMessage("Group ID must be a string"),
];

/**
 * Validation rules for creating an invitation to a group.
 * 
 * - `groupId`: Required, must be a string.
 * - `userId`: Required, must be a string.
 */
export const createInvitation = [
  param("groupId")
    .notEmpty()
    .withMessage("Group ID is required")
    .isString()
    .withMessage("Group ID must be a string"),
  param("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isString()
    .withMessage("User ID must be a string"),
];

/**
 * Validation rules for accepting an invitation.
 * 
 * - `email`: Required, must be a string.
 * - `password`: Required, must be a string.
 * - `token`: Required, must be a string.
 */
export const acceptInvitation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isString()
    .withMessage("Email must be a string"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),
  param("token")
    .notEmpty()
    .withMessage("Token is required")
    .isString()
    .withMessage("Token must be a string"),
];

/**
 * Validation rules for fetching group analytics.
 * 
 * - `groupId`: Required, must be a string.
 */
export const groupAnalytics = [
  param("groupId")
    .notEmpty()
    .withMessage("Group ID is required")
    .isString()
    .withMessage("Group ID must be a string"),
];

/**
 * Validation rules for editing a group.
 * 
 * - `groupId`: Required, must be a string.
 * - `name`: Required, must be a string.
 */
export const editGroup = [
  param("groupId")
    .notEmpty()
    .withMessage("Group ID is required")
    .isString()
    .withMessage("Group ID must be a string"),
  body("name")
    .notEmpty()
    .withMessage("Group name is required")
    .isString()
    .withMessage("Group name must be a string"),
];
