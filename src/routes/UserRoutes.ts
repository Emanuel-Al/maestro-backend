import { Router } from "express";
import { createUserController, getUsersController, getUserByIdController } from "../controllers/UserController";
const router = Router();

router.post("/", createUserController);
router.get("/", getUsersController);
router.get("/:id", getUserByIdController);

export default router;