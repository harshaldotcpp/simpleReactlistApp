const jwt = require("jsonwebtoken");
const path = require("path");

const auth = async (req,res,next) =>{
    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY);
  
        next();
    }
    catch(error){
       
        console.log(error);
        res.redirect("/signup");
    }
}


module.exports = auth;
