const actionsModel = require('../models/actions.model');


const read = async (filterBy) => await actionsModel.findOne(filterBy)
const create = async (newData) => await actionsModel.create(newData)
const Delete = async (filterBy) => await actionsModel.findByIdAndUpdate(filterBy, { IS: "? no active" })
const update = async (infoUpdate) => await actionsModel.findByIdAndUpdate({ _id: infoUpdate._id }, infoUpdate.updateaction)


module.exports = {read, create, Delete, update }