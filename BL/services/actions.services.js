const { create, deleteOne, read, updateNested, update, readDates, getNested } = require("../../DL/controllers/actions.controler")

const getNestedFun = async (actionId, arrKey, kId) => {//get a array ||
    let action = await getNested(actionId, arrKey, kId)
    return action

}
const getDatesFun = async (selctor, key) => {
    const dateNow = new Date()
    const endWeek = new Date(dateNow.getTime() + 7 * 24 * 60 * 60 * 1000)
    let data = await readDates(dateNow, endWeek, selctor, key)
    return data
}
const updateNestedFun = async (actionId, arrName, objectId, newData) => {//update a key
    const dataToUpdateArrys = Object.entries(newData)
    const dataToUpdateArrysKey = dataToUpdateArrys[0][0]
    const dataToUpdateArrysVal = dataToUpdateArrys[0][1]

    let action = await updateNested(actionId, arrName, objectId, dataToUpdateArrysKey, dataToUpdateArrysVal)
    if (!action) throw "no data"
    return action
}
const creatrNestedFun = async (actionId, arrName, objectId, newData) => {
    let action = await updateNested(actionId, arrName, objectId, newData)
    if (!action) throw "no data"
    return action
}
async function handleUpdate(actionId, arrName, objectId, newData) {
    switch (arrName) {
        case "tasks":
            getNestedFun(actionId, arrName, kId)
            break;
        case "users":
            getNestedFun(actionId, arrName, kId)
            break;
        case "schedules":
            getNestedFun(actionId, arrName, kId)
            break;
        case "files":
            getNestedFun(actionId, arrName, kId)
            break;

        default:
            return
    }
}

async function handleCreate(actionId, arrName, objectId, newData) {
    switch (arrName) {
        case "tasks":
            getNestedFun(actionId, arrName, kId)
            break;
        case "users":
            // let newUser=create new user (await, service user)
            // update to action>>users>>push[newUser._id]
            getNestedFun(actionId, arrName, kId)
            break;
        case "schedules":
            getNestedFun(actionId, arrName, kId)
            break;
        case "files":
            getNestedFun(actionId, arrName, kId)
            break;

        default:
            return
    }
}

const readFun = async (filterArray) => {
    let action = await read(filterArray)
    if (!filterArray) throw "no data "
    return action
}
const updateFun = async (id, data) => {
    let action = await update(id, data)
    if (!action) throw "no data "
    return action
}
const createFun = async (data) => {
    let action = await create(data)
    if (!data) throw "no data "
    return action
}
const deleteFun = async (id) => {
    let action = await deleteOne(id)
    if (!action) throw "no data "
    return action
}

module.exports = { createFun, readFun, deleteFun, updateNestedFun, updateFun, getDatesFun, getNestedFun, creatrNestedFun, handleUpdate }

