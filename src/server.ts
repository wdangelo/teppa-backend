import express, { Request, Response } from "express";
import cors from "cors";
import firebase from "firebase";
import { CreateUsersController } from "./modules/users/controllers/CreateUsersController";


const app = express()

app.use(express.json())
app.use(cors())

const createUsersController = new CreateUsersController()

app.post('/', createUsersController.create)

// app.get('/', async (request: Request, response: Response) => {
//     const data = await Users.get();
//     const users = data.docs.map(user => ({ id: user.id, ...user.data()}))
//     response.send(users)
// })

// app.get('/:id', async (request: Request, response: Response) => {
//     const { id } = request.params
//     const data = await Users.get();
//     const users = data.docs.map(user => ({ id: user.id, ...user.data()}))
//     const user = users.filter(user => { return user.id == id})
//     response.send(user)
// })

// app.put('/:id', async (request: Request, response: Response) => {
//     const { id } = request.params
//     await Users.doc(id).update(request.body)
//     response.send({ msg: "Usuario alterado com sucesso"})
// })

// app.delete('/:id', async (request: Request, response: Response) => {
//     const { id } = request.params
//     await Users.doc(id).delete();
//     response.send({ msg: "Usuario removido com sucesso"})
// })

app.listen(3000, () => { console.log("Server is running")})