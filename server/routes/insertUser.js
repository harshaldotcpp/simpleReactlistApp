const database = require("../adminDb.js");
const getUserdb  = require("./userDb.js");


async function createUser(body){
    const res =  await  database.query(
           `CREATE USER ${body.userName}
            WITH PASSWORD '${body.password}' ;`
        );
    return res;
}

function createTable(tableName,columns,userdb){
      userdb.query(
         `CREATE TABLE
          ${tableName}(
             ${columns[0]},
             ${columns[1]} 
         );`
      );
}


function addUserCredential(body){
     database.query(
           `INSERT INTO
            users(name,user_name,email,password)
            VALUES($1,$2,$3,$4);`,
            [body.fname,
            body.userName,
            body.email,
            body.password] 
     );
};




function createDatabase(name){
    database.query(
       `CREATE DATABASE ${name+"db"}
        OWNER ${name} ; `
    );
}




async function signUp(body){
    try{
     await createUser(body).then(async()=>{
          await createDatabase(body.userName);
     });
     const userdb = getUserdb(body);
     const columns = ["todo VARCHAR(100) NOT NULL",
        "date DATE NOT NULL"];
      await createTable("todos",columns,userdb);
    }
    catch(error){
        console.log(error);
    }

    try{
      await  addUserCredential(body);
   }
    catch(error){
        console.log(error);
    };
}


module.exports = signUp;
