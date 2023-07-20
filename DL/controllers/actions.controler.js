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
   return await actionsModel.findByIdAndUpdate(id,newData, {new: true})
}

const readNumber = async (number) =>{
    
    let data = await actionsModel.find()
    return data
    
}

module.exports = { read, create, update, updateNested ,deleteOne,readNumber}
