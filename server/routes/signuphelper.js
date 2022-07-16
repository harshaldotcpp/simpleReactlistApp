const database = require("../adminDb.js");
const getUserdb  = require("../userDb.js");
const md5 = require("md5");
const jsw = require("jsonwebtoken");



async function createUser(body){
  
    const res =  await  database.query(
           `CREATE USER ${body.userName}
            WITH PASSWORD '${body.password}' ;`
        );
    return res;
}

async function createTable(tableName,columns,userdb){
      await  userdb.query(
         `CREATE TABLE
          ${tableName}(
             ${columns[0]},
             ${columns[1]} 
         );`
      );
}


async function addUserCredential(body){
  
   const res =  await database.query(
           `INSERT INTO
            users(name,user_name,email,password)
            VALUES($1,$2,$3,$4)RETURNING *;`,
            [body.fname,
            body.userName,
            body.email,
            body.password] 
     );
   return res.rows;;
  
};

async function  getWebToken(userId){
    
    return await jsw.sign({id:userId},process.env.SECRET_KEY);
}


async function createDatabase(name){
  const res = await  database.query(
       `CREATE DATABASE ${name+"db"}
        OWNER ${name} ; `
    );
  
}




async function signUp(body){
   try{
     body.password = md5(body.password);
     
     const row =  await  addUserCredential(body);
     await createUser(body);
     await createDatabase(body.userName);;
     const userdb = getUserdb(body);
     const columns = ["todo VARCHAR(100) NOT NULL",
        "date VARCHAR(20) NOT NULL"];
     await createTable("todos",columns,userdb); 
   
    return Promise.resolve(row);
    }
    catch(error){
        console.log(error);
        if(error.constraint === "users_user_name_key")
          return Promise.reject("username taken");
       if(error.constraint === "users_email_key")
           return Promise.reject("account already exist");
    }
}


module.exports = signUp;
