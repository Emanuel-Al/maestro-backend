import argon2 from "argon2";
import {
  createUser,
  getUsers,
  getUserById,
  findUserByEmail,
  updateUser,
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

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
  const isPasswordValid = await argon2.verify(user.password, password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = Jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .json({ token, user: { id: user.id, name: user.name } });
}

export async function updateUserController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = await updateUser(id, req.body);
  if (user) {
    return res.status(200).json(user);
  } else {
    return res
      .status(400)
      .json({ message: "Não foi possível atualizar usuário" });
  }
}
