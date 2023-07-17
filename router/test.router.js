const express = require('express')
const router = express.Router()

router.get('/', /*async*/ (req, res) => {
    try {
      // await 
       res.send(" root shomeaa port 3008 ")
        console.log("ok");
    } catch (error) {
        res.send(error.message)
        console.log(error.message);
    }
})

module.exports = router
