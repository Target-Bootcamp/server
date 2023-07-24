const { read, readOne, create, update, deleteOne, updateNested, readNestedBetwinDates, getNested, createNested, deleteNested, readActionsActive } = require("../../DL/controllers/actions.controler")
const getDates = require('../../functions/dates')
const dates = getDates.getAllDates()//=={ startMonth, endMonth, endWeek, iLZoneDate, Year, Month, Day}


const getNestedFun = async (actionId, arrKey, kId) => {//get a array or current keyObj
    let action = await getNested(actionId, arrKey, kId)
    return action
}
const readNestedBetwinDatesFun = async (filterBy, arrName, keyDate, toDay) => {//get nested by dates
    let data
    let date1
    let date2
    toDay = toDay && dates.iLZoneDate
    switch (filterBy) {
        case "week":
            date1 = dates.iLZoneDate
            date2 = dates.endWeek
            data = await readNestedBetwinDates(date1, date2, arrName, keyDate, toDay)
            break;
        case "month":
            date1 = dates.startMonth
            date2 = dates.endMonth
            data = await readNestedBetwinDates(date1, date2, arrName, keyDate, toDay)
            break;
        default:
            break;
    }
    if (!data) throw "no found"

    return data
}
const readActionsByEndDateFun = async () => {//get all active action
    let action = await readActionsActive(dates.iLZoneDate)
    if (!action) throw "no found"
    return action
}
const updateNestedFun = async (actionId, arrName, objectId, newData) => {//update||off-active a current key
    const dataToUpdateArrys = Object.entries(newData)
    const dataToUpdateArrysKey = dataToUpdateArrys[0][0]
    const dataToUpdateArrysVal = dataToUpdateArrys[0][1]

    let action = await updateNested(actionId, arrName, objectId, dataToUpdateArrysKey, dataToUpdateArrysVal)
    if (!action) throw "no data"
    return action
}
const creatrNestedFun = async (actionId, arrName, newData) => {
    let action = await createNested(actionId, arrName, newData)
    if (!action) throw "no data"
    return action
}
const deleteNestedFun = async (actionId, arrName, objectId,) => {//absulte remove
    const action = await deleteNested(actionId, arrName, objectId)
    if (!action) throw "no data"
    return action
}


async function handleUpdate(actionId, arrName, objectId, newData) {
    switch (arrName) {
        case "tasks":
        case "schedules":
            // conditions
            getNestedFun(actionId, arrName, kId)
            break;
        case "users":
            // conditions
            getNestedFun(actionId, arrName, kId)
            break;
        case "files":
            // conditions
            getNestedFun(actionId, arrName, kId)
            break;

        default:
            return {}
    }
}
async function handleCreate(actionId, arrName, objectId, newData) {
    switch (arrName) {
        case "tasks":
        case "schedules":
            getNestedFun(actionId, arrName, kId)
            break;
        case "users":
            // let newUser=create new user (await, service user)
            // update to action>>users>>push[newUser._id]
            getNestedFun(actionId, arrName, kId)
            break;
        case "files":
            getNestedFun(actionId, arrName, kId)
            break;

        default:
            return {}
    }
}




const readFun = async (filterBy) => {//get all actions --OR-- one by id
    let action = await filterBy ? readOne({ _id: filterBy }) : read({})
    if (!action) throw "no found"
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

module.exports = { createFun, readFun, deleteFun, updateNestedFun, updateFun, readNestedBetwinDatesFun, getNestedFun, creatrNestedFun, deleteNestedFun, readActionsByEndDateFun, handleUpdate, handleCreate }

