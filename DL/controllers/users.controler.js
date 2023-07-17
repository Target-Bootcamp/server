const usersModel = require('../models/users.model');

// async function readall(filterby) {
//     const users = await usersModel.find(filterby)
//     return users
// }
//const readall = async (filterBy) => await usersModel.find(filterBy)
const readone = async (filterBy) => await usersModel.findOne(filterBy)
const create = async (newData) => await usersModel.create(newData)
const Delete = async (filterBy) => await usersModel.findByIdAndUpdate(filterBy, {IS: "? no active"})
const update = async (infoUpdate) => await usersModel.findByIdAndUpdate({ _id: infoUpdate._id }, infoUpdate.updateuser)

module.exports = { readall, readone, create, Delete, update }