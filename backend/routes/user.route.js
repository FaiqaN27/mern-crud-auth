import express from 'express';
import { handleTestApi, handleUpdateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.get("/", handleTestApi);
router.post("/update/:id", verifyToken, handleUpdateUser)

export default router;