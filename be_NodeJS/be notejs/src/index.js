const mysql = require('mysql2');
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT 
const hostname = process.env.HOST_NAME
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'audiobook',
  port: 3306,
});

app.get('/', (req, res) => {
  res.send('Hello World! jlahcishc')
})
connection.query(
  'SELECT * FROM `books`',
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})