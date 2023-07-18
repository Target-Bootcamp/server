const express = require('express')
const router = express.Router()
const actionsControler = require('../DL/controllers/actions.controler')

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        let data = await actionsControler.create(req.body)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

module.exports = router