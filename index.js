const express = require('express');
const cors = require('cors');
const app = express();
const conectDB = require('./DL/database')
const mainRouter = require('./router/main.router')

app.use(express.json());
app.use(cors());

mainRouter(app)


conectDB.conectDB()









app.listen(3008, () => (console.log('Server listening 3008')));