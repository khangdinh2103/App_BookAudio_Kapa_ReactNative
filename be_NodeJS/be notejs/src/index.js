
const express = require('express')
const router = require('./routes/books')
const app = express()
require('dotenv').config()
const port = process.env.PORT 
const hostname = process.env.HOST_NAME
const connection = require('./config/DataBase')
const InitAPIRoute = require('./routes/books')
const cors = require('cors');

app.use(cors()); 

app.use(express.json());
InitAPIRoute(app)



// connection.query(
//   'SELECT * FROM `books`',
//   function (err, results, fields) {
//     console.log(results);  

//   }
// );


app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})

