import { IsNotEmpty, IsEmail } from "class-validator";

class User {
    
    id: string;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsNotEmpty()
    password: string;

}

export { User }
