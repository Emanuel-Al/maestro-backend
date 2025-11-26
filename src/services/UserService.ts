import prisma from "../config/prisma";
import { UserCreateInput } from "../types/UserCreateInput";
import argon2 from "argon2";

export async function createUser(data: UserCreateInput){
    try{
    const hashedPassword = await argon2.hash(data.password)
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true, 
            createdAt: true,
            updatedAt: true,
        }
    })
    return user
    }catch(e){
        console.log(e);
        throw new Error("Erro ao criar usuário");
    }
}