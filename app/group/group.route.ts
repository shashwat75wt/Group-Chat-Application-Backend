import { Router } from "express";
import { catchError } from "../common/middleware/catch-validation-error.middleware";
import * as groupController from "./group.controller";
import * as groupValidator from "./group.validation";
import passport from "passport";


const router = Router();
const authenticateJWT = passport.authenticate("jwt", { session: false });


/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Group management endpoints
 */

/**
 * @swagger
 * /groups/public:
 *   get:
 *     summary: Get public groups
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved public groups
 */
router.get("/public", authenticateJWT, groupController.fetchPublicGroups);
/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Developers Club"
 *               type:
 *                 type: string
 *                 example: "public or private"
 *     responses:
 *       201:
 *         description: Group successfully created
 */
router.post(
  "/",
  groupValidator.createGroup,
  catchError,
  authenticateJWT,
  groupController.createNewGroup
);
/**
 * @swagger
 * /groups/{groupId}/join:
 *   post:
 *     summary: Join a public group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group to join
 *     responses:
 *       200:
 *         description: Successfully joined the group
 */
router.post(
  "/:groupId/join",
  groupValidator.joinPublicGroup,
  catchError,
  authenticateJWT,
  groupController.joinPublicGroup
);
/**
 * @swagger
 * /groups/{groupId}/inviteuser/{userId}:
 *   post:
 *     summary: Invite a user to a group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to invite
 *     responses:
 *       200:
 *         description: Invitation sent successfully
 */
router.post(
  "/:groupId/inviteuser/:userId",
  groupValidator.createInvitation,
  catchError,
  authenticateJWT,
  groupController.createNewInvitation
);
/**
 * @swagger
 * /groups/accept-invitation/{token}:
 *   post:
 *     summary: Accept a group invitation
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *             properties:
 *               email:
 *                 type: string
 *                 example: "email@email.com"
 *               password:
 *                 type: string
 *                 example: "pasword"
 *     responses:
 *       200:
 *         description: Invitation accepted successfully
 */
router.post(
  "/accept-invitation/:token",
  groupValidator.acceptInvitation,
  catchError,
  passport.authenticate("login", { session: false }),
  groupController.acceptInvite
);
/**
 * @swagger
 * /groups/data:
 *   get:
 *     summary: Get overall analytics
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved analytics
 */
router.get("/data", authenticateJWT, groupController.data);
/**
 * @swagger
 * /groups/group-data/{groupId}:
 *   get:
 *     summary: Get analytics for a specific group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group
 *     responses:
 *       200:
 *         description: Successfully retrieved group analytics
 */
router.get(
  "/group-data/:groupId",
  groupValidator.groupAnalytics,
  catchError,
  authenticateJWT,
  groupController.groupdata
);
/**
 * @swagger
 * /groups/edit-group/{groupId}:
 *   put:
 *     summary: Edit a group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the group to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Group Name"
 *               description:
 *                 type: string
 *                 example: "Updated group description."
 *     responses:
 *       200:
 *         description: Group updated successfully
 */
router.put(
  "/edit-group/:groupId",
  groupValidator.editGroup,
  catchError,
  authenticateJWT,
  groupController.editGroup
);


export default router;
