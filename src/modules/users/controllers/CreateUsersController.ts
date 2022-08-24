import { Request, Response } from "express";
import { UsersRepositories } from "../repositories/UsersRepositories";

class CreateUsersController {

    async create(request: Request, response: Response): Promise<void> {
        const { name, email, password } = request.body;
        const userRepository = new UsersRepositories()
        await userRepository.create({ name, email, password });

        response.status(201).send({ message: "User created!"})
    }
    
}

export { CreateUsersController }