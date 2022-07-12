const express = require("express");
const router = express.Router();
const path = require("path");
const signUpUser = require("./insertUser");

router.post("",(req,res) => {
    res.end("signup");
    console.log(req.body);
    signUpUser(req.body);
});
/*

    res.send("/neq");
});
*/
module.exports = router;
