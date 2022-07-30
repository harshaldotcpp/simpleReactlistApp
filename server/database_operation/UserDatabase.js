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

    async getTodos(){
      const res = await  this.#userDatabase.query(
         "select * from todos"
         );
      return res.rows;
    }

    async addTodo(todo,date){
        try{
           await this.#userDatabase.query(
            `INSERT INTO todos(todo,date)
             VALUES($1,$2);`,
            [todo,date]
           );
          return {massage:"added"};
        }
        catch(error){
            console.log(error);
            console.log("cannot add todo in database");
            return {massage:"todo add operation failed"};
        }
    }

    async deleteTodo(todo,date){
        try{
            this.#userDatabase.query(
             `DELETE FROM todos
              WHERE todo = $1 AND date = $2;`,
              [todo,date]
             );
            return "Deletion Done";
        }
        catch(error){
            console.log("deletetion error");
            return "deletion failed";
        }
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
