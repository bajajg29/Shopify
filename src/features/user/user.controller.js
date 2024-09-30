import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
  //create instance of repo class
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    //between 10 to 20 salt value should be as higher the number higher time application
    // will take to load
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new UserModel(name, email, hashedPassword, type);
    await this.userRepository.signUp(user);
    res.status(201).send(user);
  }

  async signIn(req, res, next) {
    // const result = UserModel.signIn(req.body.email, req.body.password);
    try {
      // 1.find user by email
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        //if user is not foudn then return error
        return res.status(400).send("Incorrect credentials");
      } else {
        //2. compare password with hashed passowrd.
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          //3. if everything is correct then cretaing token
          const token = jwt.sign(
            { userID: user._id, email: user.email },
           process.env.JWT_SECRET ,
            {
              expiresIn: "15d",
            }
          );

          //4. send token
          return res.status(200).send(token);
        } else {
          //if result is false then return error
          return res.status(400).send("Incorrect credentials");
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("something wrong");
    }
  }
}




     // const result = await this.userRepository.signIn(
      //   req.body.email,
      //   req.body.password
      // );

      // if (!result) {
      //   return res.status(400).send("Incorrect credentials");
      // } else {
      //1.create token
      // const token = jwt.sign(
      //   { userID: result.id, email: result.email },
      //   "sbbHMf9eVl",
      //   {
      //     expiresIn: "3d",
      //   }
      // );
      // //2. send token
      // return res.status(200).send(token);