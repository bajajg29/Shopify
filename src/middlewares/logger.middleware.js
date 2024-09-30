//another module for file

import fs from "fs";
import winston from "winston";

//fspromise is part of fs module
//promise is an object of fs module

const fsPromise = fs.promises; //this fs.promise allow us to create and upload data into fs
//async without using callback



//this is using fs module


// async function log(logData) {
//   try {
//     logData = `\n ${new Date().toString()}- ${logData}`;
//     await fsPromise.appendFile("log.txt", logData);
//   } catch (err) {
//     console.log(err);
//   }
// }


// using winston library
const logger = winston.createLogger({
    level:'info',
    format:winston.format.json(),
    defaultMeta:{service:'request-logging'},
    transports:[
        new winston.transports.File({filename:'logs.txt'})
    ]
});



const loggerMiddleware = async (req, res, next) => {
  //1. log request body.
  if (!req.url.includes("signin")) {
    const logData = `${req.url}-${JSON.stringify(req.body)}`;
    // await log(logData); 
    logger.info(logData);
}
  next();
};
export default loggerMiddleware;





//log request which are coming from client
// external client 
// lib to log same thing which we have done using fsPromises is 
//npm library
// different options to log 
// winston library


