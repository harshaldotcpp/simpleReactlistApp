const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const verifyUser = require("./signinhelper.js");
const app = express();

app.use(express.static(path.join(__dirname,"../src/")));

router.get("",(req,res) =>{
    const errorMsg = {
        username:"",
        usernameMsg:"",
        passwordMsg:"",
        password:""
    }
    res.render("signin.ejs",errorMsg);
});


router.post("",(req,res) => {
   const errorMsg = {
        username:req.body.username,
        usernameMsg:"",
        passwordMsg:"",
        password:req.body.password
    }
    console.log(req.query);
    if(req.query.error === "(invalid password)")
        errorMsg.passwordMsg = req.query.error;
    if(req.query.error ===  "(invalid username)")
        errorMsg.usernameMsg = req.query.error;
    res.render("signin.ejs",errorMsg);
});




router.post("/verify",async(req,res)=>{
   
    const user  = await  verifyUser(req.body);
  
    if(user.verified){
        const token = jwt.sign({id:user.userId},process.env.SECRET_KEY);
        res.cookie("jwt",token);
        res.redirect("/");
    }
    else{
        console.log(user);
        res.redirect(307,`/signin?error=${user.reason}`);
    }
   
});

router.get("/verify",(req,res)=>{
    res.redirect("/");
})



module.exports = router;
