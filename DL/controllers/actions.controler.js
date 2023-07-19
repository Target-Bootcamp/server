const actionsModel = require('../models/actions.model');


const read = async (filterBy) =>{
    let data = await actionsModel.find(filterBy)
    return data
}
const create = async (newData) => {
    let data = await actionsModel.create(newData)
    return data
}
const deleteOne = async (id) => {
    let data = await actionsModel.findByIdAndRemove(id)
    return data
}

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


module.exports = { read, create, update, updateNested ,deleteOne}
