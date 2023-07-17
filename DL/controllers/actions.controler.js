const actionsModel = require('../models/actions.model');

// async function readall(filterby) {
//     const actions = await actionsModel.find(filterby)
//     return actions
// }
//const readall = async (filterBy) => await actionsModel.find(filterBy)
const readone = async (filterBy) => await actionsModel.findOne(filterBy)
const create = async (newData) => await actionsModel.create(newData)
const Delete = async (filterBy) => await actionsModel.findByIdAndUpdate(filterBy, { IS: "? no active" })
const update = async (infoUpdate) => await actionsModel.findByIdAndUpdate({ _id: infoUpdate._id }, infoUpdate.updateaction)

module.exports = { readall, readone, create, Delete, update }