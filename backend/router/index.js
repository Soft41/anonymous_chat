import express from 'express';
import chatController from "../controller/chatController.js";

const router = express.Router();

router.post('/start', chatController.addQueue);
router.post('/leave', chatController.leaveQueue);

export default router;
