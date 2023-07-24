const express = require('express')
const router = express.Router()
const { createFun, readFun, deleteFun, updateNestedFun, updateFun, readNestedBetwinDatesFun, getNestedFun, creatrNestedFun, deleteNestedFun, readActionsByEndDateFun, handleUpdate, handleCreate } = require('../BL/services/actions.services')
const { getMonthRange } = require('../functions/dates')
// fs
const { checkIfEmpty, renameFile, crateFolder, crateFile, editFile, readFile, readFolder, deleteFF, claerFolder } = require("../functions/fs.functions")
const { uploadFile } = require("../functions/upload.functions")
const { readActionsActive } = require('../DL/controllers/actions.controler')
const { fuulDateOver, getDate, getOuer, getOuerMS } = require('../functions/getTime.functions')
const root = "./public/root"


//  **** Key/Array of Action
router.get('/:actionId/:arrKey', async (req, res) => {
    const { actionId, arrKey } = req.params
    try {
        const result = await getNestedFun(actionId, arrKey, kId)
        console.log(result);
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
router.put('/:actionId/:arrKey', async (req, res) => {
    const { actionId, arrKey } = req.params
    try {
        const resoult = await creatrNestedFun(actionId, arrKey, req.body)
        res.send(resoult)
    } catch (error) {
        console.log(error);
        res.send(error)

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
    console.log(actionId, arrKey, kId, req.body)
    try {
        const result = await updateNestedFun(actionId, arrKey, kId, req.body)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message || error)
    }
})
router.delete('/:actionId/:arrKey/:key', async (req, res) => {// chaingh activiti
    const { actionId, arrKey, key } = req.params
    try {
        const result = await updateNestedFun(actionId, arrKey, key, req.body)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message || error)
    }
})
router.delete('/remove/:actionId/:arrKey/:kId', async (req, res) => {// delete from data
    const { actionId, arrKey, kId } = req.params
    try {
        const result = await deleteNestedFun(actionId, arrKey, kId,)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message || error)
    }
})

//  **** all Actions
router.get("/", async (req, res) => {
    try {
        let data = await readFun()
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
        res.send(data)
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

//  **** get nested items by dates
router.get('/:arrName/:nameDateObjKey', async (req, res) => {
    const { arrName, nameDateObjKey } = req.params
    const toDay = req.body.toDay == true ? true : false
    try {
        let data = await readNestedBetwinDatesFun(arrName, nameDateObjKey, toDay)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message)
    }
})

//   *** get all actions activs ***
router.get('/actions/activs', async (req, res) => {
    try {
        let data = await readActionsByEndDateFun()
        res.send(data)
    } catch (error) {
        console.log(error);
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