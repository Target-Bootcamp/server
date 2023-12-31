const express = require('express')
const router = express.Router()
const { createFun, readFun, deleteFun, updateFun, updateNestedFun, getDatesFun, getNestedFun } = require('../BL/services/actions.services')
const { getMonthRange } = require('../functions/monthdate')
// fs
const { checkIfEmpty, renameFile, crateFolder, crateFile, editFile, readFile, readFolder, deleteFF, claerFolder } = require("../functions/fs.functions")
const { uploadFile } = require("../functions/upload.functions")
const { fuulDateOver, getDate, getOuer, getOuerMS } = require('../functions/getTime.functions')

const root = "./public/root"


//  **** Key/Array of Action
router.get('/:actionId/:arrKey', async (req, res) => {
    const { actionId, arrKey } = req.params
    try {
        const result = await getNestedFun(actionId, arrKey,)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
router.post('/:actionId/:arrKey', async (req, res) => {
    const { actionId, arrKey, } = req.params
    try {
        const result = await getNestedFun(actionId, arrKey, req.body)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

//  **** Single value in array of Action
router.get('/:actionId/:arrKey/:kId', async (req, res) => {
    const { actionId, arrKey, kId } = req.params
    try {
        const result = await getNestedFun(actionId, arrKey, kId)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
router.put('/:actionId/:arrKey/:kId', async (req, res) => {
    const { actionId, arrKey, kId } = req.params
    try {
        const result = await updateNestedFun(actionId, arrKey, kId, req.body)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message || error)
    }
})
// *** TODO : finish
router.delete('/:actionId/:arrKey/:kId', async (req, res) => {
    const { actionId, arrKey, kId } = req.params
    try {
        const result = await updateNestedFun(actionId, arrKey, kId, req.body)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message || error)
    }
})

//  **** all Actions
router.get("/", async (req, res) => {
    try {
        let data = await readFun({})
        res.send(data)
    } catch (error) {

    }
})

//  **** single Action
router.post('/', async (req, res) => {
    try {
        let data = await createFun(req.body)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
router.get("/:id", async (req, res) => {
    try {
        let data = await readFun({ _id: req.params.id })
        res.send(data[0])
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.put("/:id", async (req, res) => {
    try {
        let data = await updateFun(req.params.id, req.body)
        res.send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.delete("/:id", async (req, res) => {
    try {
        let data = await deleteFun(req.params.id)
        res.send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
//  **** get tasks of this week
router.get('/:selctor/:key', async (req, res) => {
    const { selctor, key } = req.params
    try {
        let data = await getDatesFun(selctor, key)
        res.send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//  **** TODO : need to finish
router.get('/actionId/:selctor/:month', async (req, res) => {
    const { start, end } = getMonthRange(year, month)
    const { selctor, key } = req.params
    try {
        // let data = await ?(selctor, start,end)
        res.send(data)
    } catch (error) {
         res.status(400).send(error.message)
    }
})

//  **** Files
router.post('/:folder', uploadFile("file"), async (req, res) => {
    const file = req.file
    const folder = req.params.folder
    const fileName = file.originalname
    const folderPath = `${root}/${folder}`
    try {
        crateFolder(folderPath)
        renameFile(file.path, `${folderPath}/${fuulDateOver}__${fileName}`)
        const data = {
            fileName,
            fileType: file.mimetype.split("/")[0],
            size: file.size,
            createdDate: `${getDate()}_${getOuer()}`,
            filePath: `${folderPath}/${fuulDateOver}__${fileName}`
        }
        // console.log(data);
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})









module.exports = router