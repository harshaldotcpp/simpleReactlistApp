const express = require("express");
const router = express.Router();
const path = require("path");
const signUp  = require("./signuphelper");
const jwt = require("jsonwebtoken");
const confirmPassword  = require("../middlewares/confirmPassword.js");




router.post("/verify",confirmPassword,(req,res) => {
   
    console.log("hbsjshsissbsusbsusvshsvsjsbsnsis"); 
    signUp(req.body)
    .then((rows)=>{
       res.cookie("jwt",rows);
       res.sendFile(path.join(__dirname,"../../public/signin.html"))
    }).catch((error)=>{
         console.log(error);
         res.send(error);
    });

});

router.get("",(req,res)=>{
    if(req.cookies.jwt)
        res.redirect("/");


    const info = {
       name:"",
       nameMsg:"",
       userName:"",
       userNameMsg:"",
       email:"",
       emailMsg:"",
       password: "",
       passwordMsg:""

    };
    res.render("signup.ejs",info);
});
function createErrorObject(body){
    const info = {
       name:body.fname,
       nameMsg:"",
       userName:body.userName,
       userNameMsg:"",
       email:body.email,
       emailMsg:"",
       password:body.password,
       passwordMsg:""

    }
    if(!body.fname.length) info.nameMsg  = "name missing";
    if(!body.userName.length) info.userNameMsg = "userName missing";
    if(!body.email.length) info.emailMsg = "email missing";
    if(body.password.length < 6) info.passwordMsg = "password is short";
    return info;
}
/* if user send post requestto /verify for singup and put or miss wrong record
  post requist will be redirect to same same signUp url qith massage for user */
router.post("",(req,res)=>{
     const ejsInfo = createErrorObject(req.body); 
     console.log(ejsInfo); 
    res.render("signup.ejs",ejsInfo);

});


module.exports = router;
