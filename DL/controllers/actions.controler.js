const actionsModel = require('../models/actions.model');
const {} = require('../../functions/fs.functions')
const {uploadFile} = require('../../functions/upload.functions')

const read = async (filterBy) => {
    let data = await actionsModel.find(filterBy)
    return data
}


// readDates().then(console.log)
const create = async (newData) => {
    let data = await actionsModel.create(newData)
    return data
}
const deleteOne = async (id) => {
    let data = await actionsModel.findByIdAndRemove(id)
    return data
}
const getNested=async(actionId,arrKey)=>{

}
async function updateNested(actionId, arrName, objectId, dataToUpdateKey, dataToUpdateVal) {
    await actionsModel.findOneAndUpdate(
        { _id: actionId, [`${arrName}._id`]: objectId },
        { $set: { [`${arrName}.$.${dataToUpdateKey}`]: dataToUpdateVal } },
        { new: true }
    )

    return read({_id:actionId})
}
const readDates = async (date1, date2, arrKey, key) => {
    // date1 = new Date()
    // date2 = new Date(date1.getTime() + 7 * 24 * 60 * 60 * 1000)
    // arrKey = "tasks"
    // key = "deadline"
    let data = await actionsModel.find(
        {
            [`${arrKey}.${key}`]: {
                "$gte": date1,
                "$lt": date2
            }
        }, `_id  name ${arrKey}`
    ).lean().exec()
    let newdata = data.map((val, i) => {
        return {
            ...val, [arrKey]: val[arrKey]
                .filter(item => item[key] < date2 && item[key] > date1)
        }
        // val[arrKey].map((val) => {
        //     val[key] < date2 && val[key] > date1 ? newdata = [...newdata, val] : null
        // })
    })
    return newdata
}
const update = async (id, newData) => {
    return await actionsModel.findByIdAndUpdate(id, newData, { new: true })
}

// TODO :
//  - readOne (findOne)
//  - readNested 


module.exports = { read, create, update, updateNested, deleteOne, readDates,getNested }
