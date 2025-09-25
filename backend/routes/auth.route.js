import express from "express";
import { handleSignup, handleSignin, handleGoogleAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", handleSignup)
router.post("/signin", handleSignin);
router.post("/google", handleGoogleAuth)

export default router;