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
 *     summary: For Public Group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully recieved public groups
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
 *                 example: "Real Coders"
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
 * /groups/{group-id}/join:
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
 *         description: ID of the group for joining
 *     responses:
 *       200:
 *         description: Successfully joined the group {best of luck}
 */
router.post(
  "/:group-id/join",
  groupValidator.joinPublicGroup,
  catchError,
  authenticateJWT,
  groupController.joinPublicGroup
);
/**
 * @swagger
 * /groups/{group-id}/invite-user/{user-id}:
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
  "/:group-id/invite-user/:user-id",
  groupValidator.createInvitation,
  catchError,
  authenticateJWT,
  groupController.createNewInvitation
);
/**
 * @swagger
 * /groups/accept-invitation/{token}:
 *   post:
 *     summary: Accept the group invitation
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *             properties:
 *               email:
 *                 type: string
 *                 example: "email@75way.com"
 *               password:
 *                 type: string
 *                 example: "pasword"
 *     responses:
 *       200:
 *         description: Invitation accepted successfully {congrats}
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
 *     summary: Get overall data
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully recieved data"
 */
router.get("/data", authenticateJWT, groupController.data);
/**
 * @swagger
 * /groups/group-data/{group-id}:
 *   get:
 *     summary: Data for a specific group
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
 *         description: recieved group analytics
 */
router.get(
  "/group-data/:group-id",
  groupValidator.groupAnalytics,
  catchError,
  authenticateJWT,
  groupController.groupdata
);
/**
 * @swagger
 * /groups/edit-group/{group-id}:
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
 *                 example: "Please Update"
 *               description:
 *                 type: string
 *                 example: "Please Update"
 *     responses:
 *       200:
 *         description: success
 */
router.put(
  "/edit-group/:group-id",
  groupValidator.editGroup,
  catchError,
  authenticateJWT,
  groupController.editGroup
);


export default router;
