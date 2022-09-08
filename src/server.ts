import express from "express";
import cors from "cors";
import { UsersController } from "./modules/users/controllers/UsersController";
import { AuthenticateController } from "./modules/users/controllers/AuthenticateController";

const app = express()

app.use(express.json())
app.use(cors())

const usersController = new UsersController();
const authenticateController = new AuthenticateController();

app.post('/users', usersController.create)

app.get('/users', usersController.listAll)

app.get('/users/:id', usersController.listOne)

app.get('/users/:email', usersController.findByEmail)

app.put('/users/:id', usersController.upadate)

app.delete('/users/:id', usersController.delete)

app.post('/session', authenticateController.handle)


app.listen(3333, () => { console.log("Server is running")})