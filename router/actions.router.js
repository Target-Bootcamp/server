const express = require('express')
const router = express.Router()
const {createFun,readFun,deleteFun,updateFun,updateNestedFun} = require('../BL/services/actions.services')


          
router.put('/:actionId/:arrKey/:taskId', async (req, res) => {
    const { actionId, arrKey, taskId } = req.params
    try {
        const result = await updateNestedFun(actionId, arrKey, taskId, req.body)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

router.put("/:id",async(req, res) => {
    try {
        let data = await updateFun(req.params.id, req.body)
        res.send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.post('/', async (req, res) => {
    try {
        let data = await createFun(req.body)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
router.get("/", async (req, res) => {
    try {
        let data = await readFun({})
        res.send(data)
    } catch (error) {

    }
})
router.get("/:id", async (req, res) => {
    try {
        let data = await readFun({_id: req.params.id})
        res.send(data[0])
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.delete("/:id",async(req, res) => {
    try {
        let data = await deleteFun(req.params.id)
        res.send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})




module.exports = router