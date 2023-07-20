const { deleteOne, create, read, update, } = require("../../DL/controllers/users.controler")

const createFun = async (data) => {
    if (!data) throw "no data "
    let action = await create(data)
    return action
}
const readFun = async (filterBy) => {
    if (!filterBy) throw "no data "
    let data = await read(filterBy)
    return (filterBy._id ? data[0] : data)
}
const deleteFun = async (id) => {
    if (!id) throw "no data "
    let action = await deleteOne(id)
    return action
}
const updateFun = async (id, data) => {
    let action = await update(id, data)
    if (!data) throw "no data "
    else if (!id) throw "no id "
    else if (!action) throw "data not found"
    return action
}
module.exports = { createFun, readFun, deleteFun, updateFun }






