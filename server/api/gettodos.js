const express = require("express");
const router = express.Router();
const apiauth  = require("../middlewares/authapi.js");
const database = require("../adminDb.js");
const getUserDb  = require("../userDb.js");
async function getUserNamePassword(id){
    try{
        const res = await database.query(
            `SELECT user_name, password
             FROM users
             WHERE id = ${id};
            `
         );

        const user = res.rows[0];
        return [user.user_name,user.password];
    }
    catch(error){
        console.log(error);
    }
}


async function getTodos(userDb){
    try{
       const res = await userDb.query(`SELECT * from todos;`);
       return res.rows;;
    }
    catch(error){
    }
}



router.get("/gettodos",apiauth,async (req,res)=>{
    console.log(req.userId);
    const user = {};
    [user.userName,user.password] =  await getUserNamePassword(req.userId);
    const userDb = await getUserDb(user);   
    const todos  = await getTodos(userDb);
    console.log(todos)
    res.status(200).send(todos);
});

router.post("/posttodos",apiauth,async (req,res)=>{
    const userDb = await getUserDb(req.userId);

    res.json({message:"done"});
});


module.exports = router;
