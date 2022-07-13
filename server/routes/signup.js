const express = require("express");
const router = express.Router();
const path = require("path");
const signUp  = require("./insertUser");
const jwt = require("jsonwebtoken");





router.post("",(req,res) => {
    
    signUp(req.body).
    then((rows)=>{
       res.cookie("jwt",rows);
       res.sendFile(path.join(__dirname,"../../signin.html"))
    }).catch((error)=>{
         res.send(error);
    });

});
/*

    res.send("/neq");
});
*/
module.exports = router;
