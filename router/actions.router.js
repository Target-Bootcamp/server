const express = require('express')
const router = express.Router()
const { createFun, readFun, deleteFun, updateFun, updateNestedFun, getDatesFun } = require('../BL/services/actions.services')
// fs
const {checkIfEmpty,renameFile,crateFolder,crateFile,editFile,readFile,readFolder,deleteFF,claerFolder} = require("../functions/fs.functions")

const { uploadFile } = require("../functions/upload.functions")
const {fuulDateOver,getDate,getOuer,getOuerMS} = require('../functions/getTime.functions')

const root = "./DL/root"

// bnana
// claerFolder(`${root}/bnana`)

router.post('/:folder',uploadFile("file"), async (req, res) => {
    const file = req.file
    const folder = req.params.folder
    const fileName = file.originalname
    const folderPath =`${root}/${folder}`
    try {
        crateFolder(folderPath)
        renameFile(file.path,`${folderPath}/${fuulDateOver}__${fileName}`)
        const data = {
            fileType: file.mimetype.split("/")[0],
            size: file.size,
            fileName,
            createdDate: getDate(),
            createdOuer: getOuer(),
            filePath:`${folderPath}/${fuulDateOver}__${fileName}`
        }
        console.log(data);
        res.send(file)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})


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

router.put("/:id", async (req, res) => {
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
        let data = await readFun({ _id: req.params.id })
        res.send(data[0])
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/:selctor/:key', async (req, res) => {
    const { selctor, key } = req.params
    try {
        let data = await getDatesFun(selctor, key)
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




module.exports = router