import { Router } from "express";
import { signin, signup } from "../controllers/authControllers.js";
const router = Router();

// create a user
router.post("/signup", signup);

// Sign in
router.post("/signin", signin);

// auth with google
router.post("/google");
export default router;
