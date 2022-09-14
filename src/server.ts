import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import "reflect-metadata"

import cors from "cors";
import { UsersController } from "./modules/users/controllers/UsersController";
import { AuthenticateController } from "./modules/users/controllers/AuthenticateController";
import { authenticated } from "./middlewares/authenticate";
import { AppError } from "./shared/errors/AppError";

const app = express()

app.use(express.json())
app.use(cors())

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if(err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message
            });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`
        })
    }
)

const usersController = new UsersController();
const authenticateController = new AuthenticateController();

app.post('/users', authenticated, usersController.create)

app.get('/users', usersController.listAll)

app.get('/users/:id', usersController.listOne)

app.get('/users/:email', usersController.findByEmail)

app.put('/users/:id', usersController.upadate)

app.delete('/users/:id', usersController.delete)

app.post('/session', authenticateController.handle)


app.listen(3333, () => { console.log("Server is running")})