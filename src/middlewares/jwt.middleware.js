// import jwt from "jsonwebtoken";

// const jwtAuth = (req, res, next) => {
//   //1.Read the token
  
//   // const token = req.headers["authorization"];
//  const token= req.header("Authorization").replace("Bearer", "");
//   console.log(token);
//   //2.If no token,return the error
//   if (!token) {
//     return res.status(401).send("Unauthorized");
//   }

//   //3. check if token is valid
//   try{
//   const payload=  jwt.verify(token, "sbbHMf9eVl");
//   req.userID=payload.userID;
//     console.log(payload);
//     next();
//   }  //5. return error
//   catch(err){
//     console.log(err);
//     return res.status(401).send("Unauthorized");
//   }


//   //5.call next middleware


// };

// export default jwtAuth;


import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // 1. Read the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "").trim();

  // 2. If no token, return an unauthorized error
  if (!token) {
    return res.status(401).send("Access Denied: No Token Provided");
  }

  // 3. Verify the token
  try {
    const payload = jwt.verify(token, "sbbHMf9eVl");
    
    // 4. Attach the user ID to the request object for later use
    req.userID = payload.userID;
    next(); // 5. Call the next middleware
  } catch (err) {
    console.log(err);
    return res.status(401).send("Access Denied: Invalid Token");
  }
};

export default jwtAuth;
