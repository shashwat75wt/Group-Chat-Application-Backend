import express from "express";
import userRoutes from "./user/user.route";
import groupRoutes from "./group/group.route";
import messageRoutes from "./message/message.route";

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/groups", groupRoutes);
router.use("/messages", messageRoutes);

export default router;