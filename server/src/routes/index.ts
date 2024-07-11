import { Router } from "express";
import * as authController from "../controllers/authController";
import * as userController from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/user", authMiddleware, userController.getUser);

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
