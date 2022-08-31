import express from "express";
import cors from "cors";
import { UsersController } from "./modules/users/controllers/UsersController";

const app = express()

app.use(express.json())
app.use(cors())

const usersController = new UsersController()

app.post('/users', usersController.create)

app.get('/users', usersController.listAll)

app.get('/:id', usersController.listOne)

app.get('/users/:email', usersController.findByEmail)

app.put('/:id', usersController.upadate)

app.delete('/:id', usersController.delete)


app.listen(3333, () => { console.log("Server is running")})