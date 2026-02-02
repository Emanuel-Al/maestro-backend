import prisma from "../config/prisma";
import { UserCreateInput } from "../types/UserCreateInput";
import argon2 from "argon2";

export async function createUser(data: UserCreateInput) {
  try {
    const hashedPassword = await argon2.hash(data.password);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
    throw new Error("Erro ao criar usuário");
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  } catch (e) {
    console.log(e);
  }
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
  }
}

export async function findUserByEmail(email: string) {
  try {
    const user = prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  } catch (e) {
    console.log(e);
  }
}

export async function updateUser(
  userId: number,
  updatedData: Partial<UserCreateInput>,
) {
  try {
    delete updatedData.password; //Remove password from updated user
    const user = await getUserById(userId);
    if (user != undefined && user != null) {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updatedData,
        select: {
          id: true,
          name: true,
          nickname: true,
          email: true,
          profilePic: true,
        },
      });
      return updatedUser;
    }
  } catch (e) {
    console.log(e);
  }
}
