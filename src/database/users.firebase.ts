import firebase  from "firebase";
import { ICreateUserDTO } from "../modules/users/dto/ICreateUserDTO";

import { hash } from "bcrypt"


const firebaseConfig = {
    apiKey: "AIzaSyDW4ycrQvOWB97AwJZtXp0tx0VDa0kMvLk",
    authDomain: "teppa-backend-4276a.firebaseapp.com",
    projectId: "teppa-backend-4276a",
    storageBucket: "teppa-backend-4276a.appspot.com",
    messagingSenderId: "893129437605",
    appId: "1:893129437605:web:5be161883a56904437b84c"
  };

  firebase.initializeApp(firebaseConfig)

  const database = firebase.firestore();

  class User {

    async create({name, email, password}: ICreateUserDTO) {


        const user = database.collection("users")

        const data = await user.get()

        const users = data.docs.map(item => ({id: item.id, ...item.data()}));
        const searchUser = users.filter(item => { return item['email'] == email})

        if(searchUser.length > 0) {
          throw new Error("User already exists")
        } 

        const passwordHash = await hash(password, 8)

        await user.add({
          name,
          email,
          password: passwordHash
        });

    }
    
  }



  export {User, database}



