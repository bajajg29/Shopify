import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error_handler/applicationError.js";

export class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }

  //  static async signUp(name, email, password, type) {
  //     try{
  //     //1.get the database
  //     const db = getDB();
  //     //2. get the collection
  //     const collection = db.collection("users");
  //     const newUser = new UserModel(name, email, password, type);
  //     //3. insert the document
  //    await collection.insertOne(newUser);
  //    return newUser;
  //     }catch(err){
  //       throw new ApplicationError("OOPSYYY!!!! Something went wrong",500);
  //     }
  //     //now mongodb will take care of generating id for us
  //     //also we are using with mongodb so we dont have need to work with users array
  //     //  newUser.id=users.length+1;
  //     //   users.push(newUser);

  //   }

  // static signIn(email, password) {
  //   const user = users.find((u) => u.email === email && u.password == password);
  //   return user;
  // }

  static getAll() {
    return users;
  }
}

//default user
let users = [
  {
    id: 1,
    name: "Seller User",
    email: "seller@ecom.com",
    password: "Password",
    type: "seller",
  },
  {
    id: 2,
    name: "Customer User",
    email: "customer@ecom.com",
    password: "Password1",
    type: "customer",
  },
];
