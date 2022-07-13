const database = require("../adminDb.js");
const getUserdb  = require("./userDb.js");


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
  
     await database.query(
           `INSERT INTO
            users(name,user_name,email,password)
            VALUES($1,$2,$3,$4);`,
            [body.fname,
            body.userName,
            body.email,
            body.password] 
     );
  
};




async function createDatabase(name){
  const res = await  database.query(
       `CREATE DATABASE ${name+"db"}
        OWNER ${name} ; `
    );
  
}




async function signUp(body){
   try{
    await  addUserCredential(body);
    console.log("hit");
    await createUser(body);
    await createDatabase(body.userName);;
    const userdb = getUserdb(body);
    const columns = ["todo VARCHAR(100) NOT NULL",
        "date DATE NOT NULL"];
    await createTable("todos",columns,userdb);
    }
    catch(error){
        console.log(error.constraint);
    };
}


module.exports = signUp;
