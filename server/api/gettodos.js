const express = require("express");
const router = express.Router();
const apiauth  = require("../middlewares/authapi.js");


router.get("",apiauth,(req,res)=>{
    console.log(req.userId);
    res.status(200).json({todo:"hii",date:"8272c"});
});


module.exports = router;
