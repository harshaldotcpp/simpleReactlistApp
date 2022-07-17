const express = require("express");
const router = express.Router();
const path = require("path");
const signUp  = require("./signuphelper");
const jwt = require("jsonwebtoken");
const confirmPassword = require("../middlewares/confirmPassword.js");




router.post("",confirmPassword,(req,res) => {
   
    if(!req.body.fname.length || !req.body.userName.length || !req.body.email.length || !req.body.password.length){
        res.sendFile(path.join(__dirname,"../../public/signup.html"));
        return; 
    }

    
   
    signUp(req.body).
    then((rows)=>{
       res.cookie("jwt",rows);
       res.sendFile(path.join(__dirname,"../../public/signin.html"))
    }).catch((error)=>{
         console.log(error);
         res.send(error);
    });

});


module.exports = router;
