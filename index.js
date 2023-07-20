require("dotenv").config()
const express = require('express');
const cors = require('cors');
const app = express();
const {crateFolder}= require('./functions/fs.functions')
require('./DL/database').connect()

app.use(express.json());
app.use(cors());

const maineRouter = require('./router/main.router')
maineRouter(app)
crateFolder("public")
const root = "./public/root"
crateFolder(root)
crateFolder(`./public/temp`)
app.use(express.static('public'));


app.listen(7777, () => (console.log('Server listening 7777')));








