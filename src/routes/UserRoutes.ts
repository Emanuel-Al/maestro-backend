import { Router } from "express";
import { createUserController } from "../controllers/UserController";
const router = Router();

router.post("/", createUserController);

export default router;