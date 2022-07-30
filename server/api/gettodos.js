const express = require("express");
const router = express.Router();
const apiauth  = require("../middlewares/authapi.js");
const AdminDatabase = require("../database_operation/AdminDatabase.js");
const UserDatabase = require("../database_operation/UserDatabase.js");



router.get("/gettodos",apiauth,async (req,res)=>{
    const adminDb = new AdminDatabase(); 
    const userDbCredential = await adminDb.getUserDbCredentials(req.userId);
    const userDatabase = new UserDatabase(userDbCredential);
    const todos  = await userDatabase.getTodos();
   
    res.status(200).send(todos);
});





router.post("/posttodos",apiauth,async (req,res)=>{
    const adminDb = new AdminDatabase(); 
    const userDbCredential = await adminDb.getUserDbCredentials(req.userId);
    const userDatabase = new UserDatabase(userDbCredential);
    const massage = await userDatabase.addTodo(req.body.todo,req.body.date);
    
    res.json(massage);
});



router.post("/removetodo",apiauth,async(req,res)=>{
    const adminDb = new AdminDatabase(); 
    const userDbCredential = await adminDb.getUserDbCredentials(req.userId);
    const userDatabase = new UserDatabase(userDbCredential);
    const message = await  userDatabase.deleteTodo(req.body.todo,req.body.date);
    console.log(message);
    res.json(message); 
});




module.exports = router;
