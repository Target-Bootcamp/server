const { readOne, create, deleteOne, read, updateNested, update, readDates, getNested, deleteNested, createNested } = require("../../DL/controllers/actions.controler")
const getDates = require('../../functions/dates')
const dates = getDates.getAllDates()//=={ startMonth, endMonth, endWeek, iLZoneDate, Year, Month, Day}


const getNestedFun = async (actionId, arrKey, kId) => {//get a array or current key
    let action = await getNested(actionId, arrKey, kId)
    return action

}
const getEndWeekDatesFun = async (arrName, key) => {// week
    const dateNow = dates.iLZoneDate
    const endWeek = dates.endWeek
    let data = await readDates(dateNow, endWeek, arrName, key)
    return data
}
const updateNestedFun = async (actionId, arrName, objectId, newData) => {//update a current key
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
const deleteNestedFun = async (actionId, arrName, objectId,) => {
    const action = await deleteNested(actionId, arrName, objectId)
    if (!action) throw "no data"
    return action
}


async function handleUpdate(actionId, arrName, objectId, newData) {
    switch (arrName) {
        case "tasks":
        case "schedules":
            // condition
            getNestedFun(actionId, arrName, kId)
            break;
        case "users":
            // condition
            getNestedFun(actionId, arrName, kId)
            break;
        case "files":
            // condition
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



// const readActionsByDateFun= async()=>{
//     let action = await read({ : filterArray }) 
//     if (!filterArray) throw "no data "
//     return action
// }
const readFun = async (filterArray) => {
    let action = await filterArray ? readOne({ _id: filterArray }) : read({})
    // if (!filterArray) throw "no data "
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

module.exports = { createFun, readFun, deleteFun, updateNestedFun, updateFun, getEndWeekDatesFun, getNestedFun, creatrNestedFun, deleteNestedFun, handleUpdate, handleCreate }

