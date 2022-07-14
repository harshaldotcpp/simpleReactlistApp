const { Pool  } = require("pg");

const adminDb = new Pool({
    user: process.env.DATABASE_USER,
    database:process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
});



module.exports = adminDb;


