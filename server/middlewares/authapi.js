const jwt = require("jsonwebtoken");


const apiauth = async (req,res,next) =>{
  try{
   const [auth,token] = req.headers.authorization.split(" ");
   if(auth !== "Bearer")
       throw "Authorization must be Bearer";
   
   let userToken = req.cookies.jwt;
   let  authToken = token;
   userToken = jwt.verify(userToken,process.env.SECRET_KEY);  
   authToken = jwt.verify(authToken,process.env.SECRET_KEY);
   if(userToken.id != authToken.id)
       throw "token does not match";
   req.userId = userToken.id; 
   next();
  }
  catch(error) {
     res.status(401).json({message:error,status:401});
  }
}

module.exports = apiauth;
