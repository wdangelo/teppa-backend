import { database } from "../../../database"
import { ICreateUserDTO } from "../dto/ICreateUserDTO"

class UsersRepositories {
    constructor(
        private Users = database.collection("users")
    ){}
    async create({ name, email, password }: ICreateUserDTO): Promise<void> {
        await this.Users.add({
            name,
            email,
            password
        })

    }
}

export { UsersRepositories }