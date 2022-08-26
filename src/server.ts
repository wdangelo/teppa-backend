import express, { Request, Response } from "express";
import cors from "cors";
import { UsersController } from "./modules/users/controllers/UsersController";

const app = express()

app.use(express.json())
app.use(cors())

const usersController = new UsersController()

app.post('/', usersController.create)

app.get('/', usersController.listAll)

app.get('/:id', usersController.listOne)

app.put('/:id', usersController.upadate)

app.delete('/:id', usersController.delete)

app.listen(3000, () => { console.log("Server is running")})