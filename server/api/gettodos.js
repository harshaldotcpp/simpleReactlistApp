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

const deleteTodoFromDb = async (id,userDb) =>{
    try{
        await  userDb.query(
             `DELETE FROM todos
              where id = ${id};`
        );

    }catch(error){
        console.log("error in deleteTodoFromDb");
    }
}

const addTodoInDb = async (id,todo,date,userDb) => {
     try{
         await userDb.query(
            `INSERT INTO todos(id,todo,date)
             VALUES($1,$2,$3);`,
             [id,todo,date]
         );
      console.log(id,todo,date);
     }
     catch(error){
         
         console.log(id,todo,date)
         console.log(error);
      }
}

router.get("/gettodos",apiauth,async (req,res)=>{
  
    const user = {};
    
    [user.userName,user.password] =  await getUserNamePassword(req.userId);
    const userDb = await getUserDb(user);   
    const todos  = await getTodos(userDb);
    res.status(200).send(todos);
});





router.post("/posttodos",apiauth,async (req,res)=>{
    const {id,todo,date} = req.body;; 
    const user = {};
    [user.userName,user.password] = await getUserNamePassword(req.userId);
    const userDb = await getUserDb(user);
    await addTodoInDb(id,todo,date,userDb); 
    res.json({message:"done"});
});


module.exports = router;
