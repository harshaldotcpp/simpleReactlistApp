const database = require("../adminDb.js");
const getUserdb  = require("../userDb.js");
const md5 = require("md5");
const jsw = require("jsonwebtoken");



async function createUser(body,id){
  
    const res =  await  database.query(
           `CREATE USER ${body.fname + id }
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
            users(first_name, last_name,user_name,email,password)
            VALUES($1,$2,$3,$4,$5)RETURNING *;`,
            [body.fname,
            body.lname,
            body.userName,
            body.email,
            body.password] 
     );
   return res.rows[0];
  
};

async function  getWebToken(userId){
    
    return await jsw.sign({id:userId},process.env.SECRET_KEY);
}


async function createDatabase(name,id){
  const res = await  database.query(
       `CREATE DATABASE ${name+ id}
        OWNER ${name + id} ; `
    );
  
}




async function signUp(body){
   try{
     body.password = md5(body.password);
     body.fname = body.fname.toLowerCase();
     body.email = body.email.toLowerCase();
     const row =  await  addUserCredential(body);
     await createUser(body,row.id);
     
     await createDatabase(body.fname,row.id);
     const userdb = getUserdb(body,row.id);
     const columns = ["todo VARCHAR(100) NOT NULL",
        "date VARCHAR(20) NOT NULL"];
     await createTable("todos",columns,userdb); 
   
    console.log(row);
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
