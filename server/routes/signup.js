const express = require("express");
const router = express.Router();
const path = require("path");
const signUp  = require("./insertUser");

router.post("",(req,res) => {
    res.end("signup");
    signUp(req.body)
//    saveUserCredentials(req.body);
});
/*

    res.send("/neq");
});
*/
module.exports = router;
