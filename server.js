// load all the environment variables in application
//so that other modules got access to environment variable


//1. 1st option ki sbse phle load kro env ko taki koi 
// issue n aye loading ka bad m
// 2. create separate file env.js


// import dotenv from "dotenv";
// dotenv.config();

//1. import express
import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
import apiDocs from "./swagger.json" assert { type: "json" };
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error_handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongodb.js";

// 2. create server
const server = express();


server.use(bodyParser.json());

//CORS policy configuration
// server.use((req,res,next)=>{
//     res.header("Acess-Control-Allow-Origin","http://localhost:5500")
//     res.header("Acess-Control-Allow-Headers","*");
//     res.header("Acess-Control-Allow-Methods","*");
//     //return ok for preflight request
//     if(req.method=="OPTIONS"){
//         return res.sendStatus(200);
//     }
//   next();
// })

var corsOptions = {
  origin: "http://localhost:5500",
};
server.use(cors());

//for all req related to product, redirect to product routes
//Bearer <token>
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use(loggerMiddleware);

server.use("/api/products", jwtAuth, productRouter);
server.use("/api/cartItems", loggerMiddleware, jwtAuth, cartRouter);
server.use("/api/users", userRouter);

//3.default request  handler
server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});

//Error handler middleware
server.use((err, req, res, next) => {
  console.log(err);
 if(err instanceof ApplicationError){
  res.status(err.code).send(err.message);
 } 
  res.status(500).send("Something went wrong, please try later");
});

//4.if none of these path are matched then api not found
//middleware to handle 404 request
server.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found.Please check our documentation for more information at localhost:3200/api-Docs"
    );
});

//5. specify port
server.listen(3200, () => {
  console.log("Server is running at 3200");
  connectToMongoDB();
});
