const actionsModel = require('../models/actions.model');



const read = async (filterBy) => await actionsModel.findOne(filterBy)
const create = async (newData) => await actionsModel.create(newData)
const Delete = async (filterBy) => await actionsModel.findByIdAndUpdate(filterBy, { IS: "? no active" })


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