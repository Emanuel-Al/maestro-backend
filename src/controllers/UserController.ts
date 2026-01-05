import argon2 from "argon2";
import {
  createUser,
  getUsers,
  getUserById,
  findUserByEmail,
} from "../services/UserService";
import { Request, Response } from "express";
import Jwt from "jsonwebtoken";

export async function createUserController(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}

export async function getUsersController(req: Request, res: Response) {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}

export async function getUserByIdController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const user = await getUserById(id);
    return res.status(200).json(user);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
}

export async function authController(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (user) {
    const auth = await argon2.verify(user.password, password);
    if (auth) {
      const token = Jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "12h" }
      );
      return res.json({
        token: token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    }
  } else {
    res.status(401).json("Email ou usuário inválidos");
  }
}
