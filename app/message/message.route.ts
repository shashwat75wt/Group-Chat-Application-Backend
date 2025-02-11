import { Router } from "express";
import { catchError } from "../common/middleware/catch-validation-error.middleware";
import * as messageController from "./message.controller";
import * as messageValidator from "./message.validation";
import passport from "passport";

// JWT authentication middleware
const authenticateJWT = passport.authenticate("jwt", { session: false });

const router = Router();

/**
 * Route for sending a new message.
 * Validates the request body, catches validation errors, authenticates the user, and then calls the controller to create the message.
 */
router.post(
  "/send-message",
  messageValidator.createMessage,  // Validation middleware for message creation
  catchError,  // Middleware to catch validation or processing errors
  authenticateJWT,  // Authentication middleware
  messageController.createMessage  // Controller function to create the message
)

/**
 * Route for fetching all messages.
 * Validates the request, catches validation errors, authenticates the user, and then calls the controller to get all messages.
 */
.post(
  "/get-message",
  messageValidator.getAllMessages,  // Validation middleware for getting messages
  catchError,  // Middleware to catch validation or processing errors
  authenticateJWT,  // Authentication middleware
  messageController.getAllMessages  // Controller function to fetch all messages
);

export default router;
