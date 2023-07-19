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
// const update = async (infoUpdate) => {
//     let data = await actionsModel.findByIdAndUpdate({ _id: infoUpdate._id }, infoUpdate.updateaction)
//     return data
// }


async function update(actionId, arrName, objectId, keyToUpdate, newData) {
    let Data
    const updatedDocument = async () => await actionsModel.findOneAndUpdate(
        { _id: actionId, [`${arrName}`]: objectId },
        { $set: { [`${arrName}.$.${keyToUpdate}`]: newData } },
        { new: true },

        (err, updatedDocument) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Document updated successfully:', updatedDocument);
                Data = updatedDocument
                return updatedDocument
            }
        }
    )
    return Data
}
// const update = async (infoUpdate) => await actionsModel.updateOne({ _id: infoUpdate._id }, infoUpdate.updateaction)


module.exports = { read, create, Delete, update }