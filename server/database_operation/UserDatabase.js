const { Pool } = require("pg");
const AdminDatabase = require("./AdminDatabase.js");


class UserDatabase{

    #userDatabase;
    constructor({username,database,password}){
      
        this.#userDatabase = new Pool({
            user: username,
            database: database,
            password: password,
            port:5432,
            host: "localhost"
        });
    }

    async showTodos(){
      const res = await  this.#userDatabase.query(
         "select * from todos"
         );
      return res.rows;
    }

    async createTable(tableName,columns){
        const cols = columns.join(",");
        console.log(cols);
        await this.#userDatabase.query(
          `CREATE TABLE ${tableName}(
           ${cols});`
         );
    }

}

module.exports = UserDatabase;
