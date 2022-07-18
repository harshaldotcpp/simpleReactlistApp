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
       res.sendFile(path.join(__dirname,"../../public/signin.html"))
    }).catch((error)=>{
         res.redirect(307,`/signup?databaseError=${error}`);
    });

});

router.get("",(req,res)=>{
    if(req.cookies.jwt)
        res.redirect("/");


    const info = {
       fname:"",
       fnameMsg:"",
       lname:"",
       lnameMsg:"",
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
       fname:body.fname,
       fnameMsg:"",
       lname:body.lname,
       lnameMsg: "",
       userName:body.userName,
       userNameMsg:"",
       email:body.email,
       emailMsg:"",
       password:body.password,
       passwordMsg:""

    }
    if(!body.fname.length) info.fnameMsg  = "(name missing)";
    if(!body.lname.length) info.lnameMsg = "(last name missing)";
    if(!body.userName.length) info.userNameMsg = "(userName missing)";
    if(!body.email.length) info.emailMsg = "(email missing)";
    if(body.password != body.confirmPassword) info.passwordMsg = "(password doesnt match)";  
    if(body.password.length < 6) info.passwordMsg = "(password is short)";
    return info;
}




/* if user send post requestto /verify for singup and put or miss wrong record
  post requist will be redirect to same same signUp url qith massage for user */
router.post("",(req,res)=>{
     const ejsInfo = createErrorObject(req.body); 
    if(req.query.databaseError === "username taken")
        ejsInfo.userNameMsg = req.query.databaseError;
    if(req.query.databaseError === "account already exist")
        ejsInfo.emailMsg = "Account with this Email Already Exist";

    console.log(req.query);
    res.render("signup.ejs",ejsInfo);

});


module.exports = router;
