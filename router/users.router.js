const express = require('express')
const router = express.Router()
const {create,create2,read} = require('../DL/controllers/users.controler')

router.post('/',async(req, res)=>{
    try {
        console.log(req.body);
        let data = await create(req.body)
        res.send(data)
    } catch (error) {
         console.log(error);
        res.status(400).send(error)
    }
})




module.exports = router