import express from "express";
import {
  handleDeleteUser,
  handleTestApi,
  handleUpdateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.put("/update/:id", verifyToken, handleUpdateUser);
router.delete("/delete/:id", verifyToken, handleDeleteUser);

export default router;
