const express = require("express");
const router = express.Router();
const path = require("path");
const signUp  = require("./insertUser");
const jwt = require("jsonwebtoken");





router.post("",(req,res) => {
    
    signUp(req.body).
    then((rows)=>{
       res.send(rows);;
    }).catch((error)=>{
         res.send(error);
    });
//    saveUserCredentials(req.body);
});
/*

    res.send("/neq");
});
*/
module.exports = router;
