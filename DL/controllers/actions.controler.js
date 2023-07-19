const actionsModel = require('../models/actions.model');


const read = async (filterBy) =>{
    let data = await actionsModel.find(filterBy)
    return data
}
const create = async (newData) => {
    let data = await actionsModel.create(newData)
    return data
}
const deletOne = async (id) => {
    let data = await actionsModel.findByIdAndRemove(id)
    return data
}
// const update = async (infoUpdate) => {
//     let data = await actionsModel.findByIdAndUpdate({ _id: infoUpdate._id }, infoUpdate.updateaction)
//     return data
// }


async function updateNested(actionId, arrName, objectId, dataToUpdateArrysKey,dataToUpdateArrysVal) {
    let Data = await actionsModel.findOneAndUpdate(
        { _id: actionId, [`${arrName}._id`]: objectId },
        { $set: { [`${arrName}.$.${dataToUpdateArrysKey}`]: dataToUpdateArrysVal } },
        { new: true }
    )
    return Data 
}


const update = async (id,newData) => {
    await actionsModel.updateOne(id,newData)
}


module.exports = { read, create, update, updateNested ,deletOne}
