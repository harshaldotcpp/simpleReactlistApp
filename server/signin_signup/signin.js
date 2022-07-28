const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const verifyUser = require("./signinhelper.js");
const app = express();


const createJwtToken = (id) => {
    return jwt.sign({id:id},process.env.SECRET_KEY);
}



// url: /signin
router.get("",(req,res) =>{
    const errorMsg = {
        username:"",
        usernameMsg:"",
        passwordMsg:"",
        password:""
    }
    res.render("signin.ejs",errorMsg);
});

// url: /signin
router.post("",(req,res) => {
   const errorMsg = {
        username:req.body.username,
        usernameMsg:"",
        passwordMsg:"",
        password:req.body.password
    }
 
    if(req.query.error === "(invalid password)")
        errorMsg.passwordMsg = req.query.error;
    if(req.query.error ===  "(invalid username)")
        errorMsg.usernameMsg = req.query.error;
    res.render("signin.ejs",errorMsg);
});



// url: /signin/verify
router.post("/verify",async(req,res)=>{
   
    const user  = await  verifyUser(req.body);
  
    if(user.verified){
        const token = createJwtToken(user.userId); 
        res.cookie("jwt",token);
        res.redirect("/");
    }
    else{
        
        res.redirect(307,`/signin?error=${user.reason}`);
    }
   
});


router.get("/verify",(req,res)=>{
    res.redirect("/");
})



module.exports = router;
