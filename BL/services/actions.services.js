const { create, deleteOne, read, updateNested, update, readDates, getNested } = require("../../DL/controllers/actions.controler")

const createFun = async (data) => {
    let action = await create(data)
    if (!data) throw "no data "
    return action
}
const readFun = async (filterArray) => {
    let action = await read(filterArray)
    if (!filterArray) throw "no data "
    return action
}
const deleteFun = async (id) => {
    let action = await deleteOne(id)
    if (!action) throw "no data "
    return action
}
const updateNestedFun = async (actionId, arrName, objectId, newData) => {
    const dataToUpdateArrys = Object.entries(newData)
    const dataToUpdateArrysKey = dataToUpdateArrys[0][0]
    const dataToUpdateArrysVal = dataToUpdateArrys[0][1]

    let action = await updateNested(actionId, arrName, objectId, dataToUpdateArrysKey, dataToUpdateArrysVal)
    if (!action) throw "no data"
    return action
}

const getNestedFun = async (actionId, arrKey) => {
    let action = await getNested(actionId, arrKey)
    return action

}
const updateFun = async (id, data) => {
    let action = await update(id, data)
    if (!action) throw "no data "
    return action
}

const getDatesFun = async (selctor, key) => {
    const dateNow = new Date()
    const endWeek = new Date(dateNow.getTime() + 7 * 24 * 60 * 60 * 1000)
    let data = await readDates(dateNow, endWeek, selctor, key)
    return data
}

module.exports = { createFun, readFun, deleteFun, updateNestedFun, updateFun, getDatesFun, getNestedFun }

