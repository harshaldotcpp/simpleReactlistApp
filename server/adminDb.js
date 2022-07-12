const { Pool  } = require("pg");

const adminDb = new Pool({
    user: "todo_admin",
    database:"todo_users",
    password: "flash@3319",
    port: 5432,
    host: "localhost"
});


module.exports = adminDb;
