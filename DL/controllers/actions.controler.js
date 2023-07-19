const actionsModel = require('../models/actions.model');


const read = async (filterBy) =>{
    let data = await actionsModel.findOne(filterBy)
    return data
}
const create = async (newData) => {
    let data = await actionsModel.create(newData)
    return data
}
const del = async (filterBy) => {
    let data = await actionsModel.findByIdAndUpdate(filterBy, { IS: "? no active" })
    return data
}
const update = async (infoUpdate) => {
    let data = await actionsModel.findByIdAndUpdate({ _id: infoUpdate._id }, infoUpdate.updateaction)
    return data
}


module.exports = {read, create,  del, update }