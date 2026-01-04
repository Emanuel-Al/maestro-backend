import { createUser,getUsers } from "../services/UserService";
import { Request, Response } from "express";

export async function createUserController(req:Request, res:Response){
    try{
        const user = await createUser(req.body);
        return res.status(201).json(user)

    }catch(e: any){
        return res.status(500).json(e.message)
    }
}

export async function getUsersController(req:Request, res:Response){
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    }catch(e: any){
        return res.status(500).json(e.message);
    }
}