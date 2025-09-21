import express from "express";
import { handleSignup, handleSignin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", handleSignup)
router.post("/signin", handleSignin);

export default router;