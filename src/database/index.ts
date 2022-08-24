import firebase from "firebase";

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
const Users = database.collection("usuarios")
export { database, Users }

