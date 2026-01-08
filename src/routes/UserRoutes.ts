import { Router } from "express";
import {
  createUserController,
  getUsersController,
  getUserByIdController,
  authController,
} from "../controllers/UserController";
const router = Router();

router.post("/", createUserController);
router.get("/", getUsersController);
router.get("/:id", getUserByIdController);
router.post("/auth", authController);

export default router;
