import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { database } from "../../../database/users.firebase";
import { compare } from "bcrypt";


class AuthenticateController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;
        const db = database.collection("users");
        const data = await db.get();
        const users = data.docs.map(item => ({id: item.id, ...item.data()}));
        const user = users.filter(item => {
            if (item['email'] == email){
                return item.id
            }
        })

        if(!user[0]) {
            throw new Error("Email or passord incorrect")
            
            
        }
        
        const passwordMAth = await compare(password, user[0]['password'])
        
        if(!passwordMAth) {
            throw new Error("Email or passord incorrect")
            
        }


        const token = sign({  }, "ebd6eec5119efbef6d71ddece6ff1419", {
            subject: user[0].id,
            expiresIn: '15m'
        }) 

        

        return response.json({token})
    }
}

export { AuthenticateController }