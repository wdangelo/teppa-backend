import { Request, Response } from "express";
import { User, database } from "../../../database/users.firebase";


const usersRepository = new User();

class UsersController {
    

    async create(request: Request, response: Response): Promise<void> {
        const { name, email, password } = request.body;

        await usersRepository.create({name, email, password})


        //await addDoc(Users, {name, email, password})

        response.status(201).send({ message: "user created successfully"})
    }

    async upadate(request: Request, response: Response): Promise<void> {
        const { id } = request.params
        const user = database.collection("users");
        await user.doc(id).update(request.body)
                      
        response.status(201).send({ message: "user updated successfully"})
    }

    async listAll(request: Request, response: Response): Promise<Response> {
        const user = database.collection("users");
        const data = await user.get();
        const users = data.docs.map(item => ({id: item.id, ...item.data()}));

        return response.status(200).json(users)

    }

    async listOne(request: Request, response: Response) {
        const { id } = request.params
        const user = database.collection("users");
        const data = await user.get();
        const users = data.docs.map(item => ({id: item.id, ...item.data()}));
        const list = users.filter(item => { return item.id == id})
        response.status(200).send(list)

    }

    async findByEmail(request: Request, response: Response) {
        const { email } = request.params
        const user = database.collection("users");
        const data = await user.get();
        const users = data.docs.map(item => ({id: item.id, ...item.data()}));
        const searchUser = users.filter(item => { return item['email'] == email})
        console.log(searchUser)
        response.status(200).send(searchUser)

    }

    async delete(request: Request, response: Response) {
        const { id } = request.params
        const user = database.collection("users");
        await user.doc(id).delete()
        response.send({ message: "user removed successfully"})
    }

}

export { UsersController }