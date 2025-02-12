import { Router } from "express";
import { catchError } from "../common/middleware/catch-validation-error.middleware";
import * as messageController from "./message.controller";
import * as messageValidator from "./message.validation";
import passport from "passport";
const authenticateJWT = passport.authenticate("jwt", { session: false });

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messaging System
 */

/**
 * @swagger
 * /messages/send-message:
 *   post:
 *     summary: Send your message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *                 example: "enter groupId : groupId"
 *               content:
 *                 type: string
 *                 example: "Hello, how are you?"
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/send-message",
  messageValidator.createMessage,
  catchError,
  authenticateJWT,
  messageController.generateMessage
);
/**
 * @swagger
 * /messages/get-all-messages:
 *   post:
 *     summary: Get all messages
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *                 example: "virat"
 *     responses:
 *       200:
 *         description: List of messages
 *       400:
 *         description: Bad request
 */
router.post(
  "/get-all-messages",
  messageValidator.getAllMessages,
  catchError,
  authenticateJWT,
  messageController.getMessages
);
export default router;
