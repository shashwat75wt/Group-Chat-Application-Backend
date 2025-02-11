import { Router } from "express";
import { catchError } from "../common/middleware/catch-validation-error.middleware";
import * as groupController from "./group.controller";
import * as groupValidator from "./group.validation";
import passport from "passport";
import { roleAuth } from "../common/middleware/role-auth.middleware";

const router = Router();
const authenticateJWT = passport.authenticate("jwt", { session: false });

// Routes configuration for group-related operations

/**
 * Route to fetch all public groups.
 * 
 * @route GET /public-group
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - Sends a list of public groups as the response.
 * @middleware authenticateJWT - Ensures that the user is authenticated via JWT.
 */
router.get(
  "/public-group",
  authenticateJWT,
  groupController.getPublicGroups
);

/**
 * Route to create a new group.
 * 
 * @route POST / 
 * @param {Request} req - The request object, containing the group creation data.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - Sends the response with the newly created group.
 * @middleware groupValidator.createGroup - Validates the request body before passing it to the controller.
 * @middleware catchError - Catches and handles any validation errors.
 * @middleware authenticateJWT - Ensures that the user is authenticated via JWT.
 */
router.post(
  "/",
  groupValidator.createGroup,
  catchError,
  authenticateJWT,
  groupController.createGroup
);

/**
 * Route for a user to join a public group.
 * 
 * @route POST /:groupId/join
 * @param {Request} req - The request object containing the groupId in the route parameters.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - Sends the response indicating whether the user joined the group successfully.
 * @middleware groupValidator.joinPublicGroup - Validates the groupId and user data.
 * @middleware catchError - Catches and handles any validation errors.
 * @middleware authenticateJWT - Ensures that the user is authenticated via JWT.
 */
router.post(
  "/:groupId/join",
  groupValidator.joinPublicGroup,
  catchError,
  authenticateJWT,
  groupController.joinPublicGroup
);

/**
 * Route to create an invitation for a user to join a specific group.
 * 
 * @route POST /:groupId/invitation/:userId
 * @param {Request} req - The request object containing groupId and userId in the route parameters.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - Sends the response with the invitation status.
 * @middleware groupValidator.createInvitation - Validates the invitation creation request.
 * @middleware catchError - Catches and handles any validation errors.
 * @middleware authenticateJWT - Ensures that the user is authenticated via JWT.
 */
router.post(
  "/:groupId/invitation/:userId",
  groupValidator.createInvitation,
  catchError,
  authenticateJWT,
  groupController.createInvitation
);

/**
 * Route to accept an invitation to join a group.
 * 
 * @route POST /accept-invitation/:token
 * @param {Request} req - The request object containing the invitation token in the route parameters.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - Sends the response indicating whether the invitation was accepted successfully.
 * @middleware groupValidator.acceptInvitation - Validates the invitation acceptance request.
 * @middleware catchError - Catches and handles any validation errors.
 * @middleware passport.authenticate("login", { session: false }) - Ensures the user is authenticated for accepting the invitation.
 */
router.post(
  "/accept-invitation/:token",
  groupValidator.acceptInvitation,
  catchError,
  passport.authenticate("login", { session: false }),
  groupController.acceptInvitation
);

/**
 * Route to fetch group analytics data.
 * 
 * @route GET /data
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - Sends the group analytics data.
 * @middleware authenticateJWT - Ensures that the user is authenticated via JWT.
 */
router.get(
  "/data",
  authenticateJWT,
  groupController.analytics
);

export default router;
