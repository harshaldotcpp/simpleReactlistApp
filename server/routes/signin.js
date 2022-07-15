const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const verifyUser = require("./signinhelper.js");
const app = express();

app.use(express.static(path.join(__dirname,"../src/")));
router.get("",(req,res) =>{
    res.sendFile(path.join(__dirname,"../../signin.html"));
    return;
});

router.post("/verify",async(req,res)=>{
  
    const user  = await  verifyUser(req.body);
  
    if(user.verified){
        const token = jwt.sign({id:user.userId},process.env.SECRET_KEY);
        res.cookie("jwt",token);
        res.redirect("/");
    }
    else
        res.send(user.reason);
    return;
});

router.get("/verify",(req,res)=>{
    res.redirect("/");
})



module.exports = router;
