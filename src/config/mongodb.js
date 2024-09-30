import { MongoClient } from "mongodb";
//mongoclient is the class from which we are importing the mongodb
//address of that database, client should know about the link which we are connecting for database
//db is running on local host, but as in real application cloud based mongodb 

// import dotenv from "dotenv";

// dotenv.config();
// const url = process.env.DB_URL;


//create function
let client;
export const connectToMongoDB=()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance=>{
       client=clientInstance;  
        console.log("Mongodb is connected");
    })
    .catch(err=> {
        console.log(err);
    })
}

export const getDB=()=>{
  return client.db();
}



//connect to database as soon as our server is running

