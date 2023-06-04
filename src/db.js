const mysql = require("mysql2");
const connection = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "Bp88mrzrd3ryy",
    database: "movieDb",
  })
  .promise();
module.exports = connection;
