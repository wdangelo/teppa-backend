import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { database } from "../database/users.firebase";
import { AppError } from "../shared/errors/AppError";

interface IPayload {
    sub: string;
  }

export async function authenticated (request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(
            token,
            "ebd6eec5119efbef6d71ddece6ff1419"
        ) as IPayload;

        const db = database.collection("users");
        const data = await db.get();
        const users = data.docs.map(item => ({id: item.id, ...item.data()}));
        const user = users.filter(item => {
            if (item.id == user_id){
                return item.id
            }
        })

        if(!user) { 
            throw new AppError("User does not exists!", 401)
        }

        request.user = {
            id: user_id
        }

        next();
    } catch {
        throw new AppError("Invalid Token!", 401)
    }
}