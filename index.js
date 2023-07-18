require("dotenv").config()
const express = require('express');
const cors = require('cors');
const app = express();
require('./DL/database').connect()

app.use(express.json());
app.use(cors());

const maineRouter = require('./router/main.router')
maineRouter(app)



app.listen(7777, () => (console.log('Server listening 7777')));