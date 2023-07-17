const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());



const conectDB = require('./DL/database')
conectDB.conectDB()









app.listen(3008, () => (console.log('Server listening 3008')));