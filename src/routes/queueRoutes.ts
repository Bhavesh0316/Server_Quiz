import express from "express";
import authenticateUser from "../config/authMiddleware";
import { joinQueue } from "../controllers/queue";
import { io } from "../server"; // Import Socket.IO instance

const router = express.Router();

// Player joins the queue
router.get("/join", authenticateUser, (req, res) => joinQueue(io)(req, res));

export default router;
