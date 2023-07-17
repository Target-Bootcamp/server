const express = require('express');
const cors = require('cors');
const app = express();

const conectDB = require('./DL/database')
conectDB.conectDB()

app.use(express.json());
app.use(cors());




const testRoute = require('./router/test.router')
app.use("/all", testRoute)



app.listen(3008, () => (console.log('Server listening 3008')));