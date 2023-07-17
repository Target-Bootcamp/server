const mongoose = require('mongoose');
require("dotenv").config()
const URL_mongo_DB = process.env.MONGO_URL
// console.log(URL_mongo_DB);


async function conectDB() {
    try {
        await mongoose.connect(URL_mongo_DB)
        console.log("Connected to mongo DB")
    } catch (error) {
        console.log(error);
    }
}

module.exports = { conectDB }