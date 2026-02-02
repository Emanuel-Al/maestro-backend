import { Router } from "express";
import {
  createUserController,
  getUsersController,
  getUserByIdController,
  authController,
  updateUserController,
} from "../controllers/UserController";
const router = Router();

router.post("/", createUserController);
router.get("/", getUsersController);
router.get("/:id", getUserByIdController);
router.post("/auth", authController);
router.put("/:id", updateUserController);

export default router;
