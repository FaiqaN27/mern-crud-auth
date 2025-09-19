import express from 'express';
import { handleTestApi } from '../controllers/user.controller.js';
const router = express.Router();

router.get("/", handleTestApi);

export default router;