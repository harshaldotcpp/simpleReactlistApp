const database = require("../adminDb.js");
const getUserdb  = require("./userDb.js");
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
    
    return await jsw.sign({id:userId},"C6zTbh36NNyRSjHEiGAb1yL1O85IKdwH");
}


async function createDatabase(name){
  const res = await  database.query(
       `CREATE DATABASE ${name+"db"}
        OWNER ${name} ; `
    );
  
}

const addTokenInDb =  async (token,id)=>{
    await database.query(
        "UPDATE users SET token = $1 WHERE id = $2 ;",
        [token,id]
     );
}



async function signUp(body){
   try{
    body.password = md5(body.password);
    
   const row =  await  addUserCredential(body);
     const token = await getWebToken(row[0]["id"]);
     console.log(token);
     await addTokenInDb(token,row[0]["id"]);
/*   await createUser(body);
    await createDatabase(body.userName);;
    const userdb = getUserdb(body);
    const columns = ["todo VARCHAR(100) NOT NULL",
        "date DATE NOT NULL"];
    await createTable("todos",columns,userdb); */
    return Promise.resolve(row);
    }
    catch(error){
        return Promise.reject(error);
    };
}


module.exports = signUp;
