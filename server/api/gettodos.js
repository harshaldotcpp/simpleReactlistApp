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

const deleteTodoFromDb = async (todo,date,userDb) =>{
    try{
        await  userDb.query(
             `DELETE FROM todos
              where todo = $1 AND date = $2;`,
              [todo,date]
        );
        return {message:"done"};

    }catch(error){
        console.log(error);
        return {message:"failed"};
    }
}

const addTodoInDb = async (todo,date,userDb) => {
     try{
         await userDb.query(
            `INSERT INTO todos(todo,date)
             VALUES($1,$2);`,
             [todo,date]
         );
      console.log(todo,date);
      return {message:"Added in data base"};
     }
     catch(error){
         
         console.log(error);
         return {message:"todoadd failed database error"};
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
    const {todo,date} = req.body;
    const user = {};
    [user.userName,user.password] = await getUserNamePassword(req.userId);
    const userDb = await getUserDb(user);
    const  massage =  await addTodoInDb(todo,date,userDb); 
    res.json(massage);
});



router.post("/removetodo",apiauth,async(req,res)=>{
    const {todo,date} = req.body;
    const user = {};
    [user.userName,user.password] = await getUserNamePassword(req.userId);
    const userDb = await getUserDb(user);
    const massage = await deleteTodoFromDb(todo,date,userDb);
    res.json(massage);
});




module.exports = router;
