const express = require('express')
const router = express.Router()
const {create,del,read,update} = require('../DL/controllers/actions.controler')

router.post('/:actionId/task', async (req, res) => { })

router.put('/:actionId/task/:taskId', async (req, res) => { })
//                ** OR **              
router.put('/:actionId/:arrKey/:taskId', async (req, res) => { })

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        let data = await create(req.body)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
router.get("/",async(req, res) => {
    try {
        let data = await read({})
        res.send(data)
    } catch (error) {
        
    }
})
router.get("/:id",async(req, res) => {
    try {
        let data = await read({_id: req.params.id})
        res.send(data)
    } catch (error) {
        
    }
})
router.post("/",(req, res) => {
    
})

module.exports = router