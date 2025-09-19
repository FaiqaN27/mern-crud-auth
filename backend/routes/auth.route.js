import express from "express";
import { handleSignup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", handleSignup)

export default router;