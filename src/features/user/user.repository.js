import { ApplicationError } from "../../error_handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";

class UserRepository {

  constructor(){
    this.collection="users";
}

  async signUp(newUser) {
    try {
      //1.get the database
      const db = getDB();
      //2. get the collection
      const collection = db.collection(this.collection);
      // this is now taken crae by controller
      // const newUser = new UserModel(name, email, password, type);
      //3. insert the document
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "OOPSYYY!!!! Something went wrong with database",
        500
      );
    }
  }

  async signIn(email, password) {
    try {
      //1.get the database
      const db = getDB();
      //2. get the collection
      const collection = db.collection(this.collection);
      // this is now taken crae by controller
      // const newUser = new UserModel(name, email, password, type);
      //3. find the document
      return await collection.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "OOPSYYY!!!! Something went wrong with database",
        500
      );
    }
  }

  async findByEmail(email) {
    try {
      const db = getDB();
      const collection = db.collection("users");
      return await collection.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "OOPSYYY!!!! Something went wrong with database",
        500
      );
    }
  }
}

export default UserRepository;
