const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {

    try {
        res.send("ok")
        console.log("ok");
    } catch (error) {
        res.send(error.message)
        console.log(error.message);
    }
})
