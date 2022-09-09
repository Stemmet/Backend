require('dotenv').config();
const { createPool } = require('mysql');
const connection = createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    multipleStatements: true
});

module.exports = connection;