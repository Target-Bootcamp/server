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
router.put('/:_id', async (req, res) => {
    try {

        const actid = req.params._id

        console.log(req.params, req.body);

        let data = await actionsControler.update(
            req.params._id, req.body.arrName, req.body.objectId, req.body.keyToUpdate, req.body.newData)

        console.log(data);

        res.send(data)

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})



module.exports = router