const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");



const app = express();

app.use(express.static(path.join(__dirname,"../src/")));
router.get("",(req,res) =>{
    res.sendFile(path.join(__dirname,"../../signin.html"));
    return;
});

router.post("/home",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../index.html"));
    return;
});



module.exports = router;
