const actionsModel = require('../models/actions.model');
const { } = require('../../functions/fs.functions')
const { uploadFile } = require('../../functions/upload.functions');
const { get } = require('../../router/actions.router');

const read = async (filterBy) => {
    let data = await actionsModel.find(filterBy)
    return data
}
const readOne = async (filterBy) => {
    let data = await actionsModel.findOne({ _id: filterBy })
    return data
}
const create = async (newData) => {
    let data = await actionsModel.create(newData)
    return data
}
const update = async (id, newData) => {
    return await actionsModel.findByIdAndUpdate(id, newData, { new: true })
}
const deleteOne = async (id) => {
    let data = await actionsModel.findByIdAndRemove(id)
    return data
}
//  ***Nested
const getNested = async (actionId, arrKey, kId) => {
    let data = await actionsModel.findOne({ _id: actionId })
    return (!kId ? data[arrKey] : data[arrKey].filter(val => val._id == kId))
    // return data[arrKey]
}
const createNested = async (actionId, arrKey, newDta) => {
    let data = await actionsModel.findOneAndUpdate(
        { _id: actionId },
        { $push: { [arrKey]: newDta } },
        { new: true }
    ).select(`${arrKey} name`)// get & update 
    return data
}
async function updateNested(actionId, arrName, objectId, dataToUpdateKey, dataToUpdateVal) {
    let data = await actionsModel.findOneAndUpdate(
        { _id: actionId, [`${arrName}._id`]: objectId },
        { $set: { [`${arrName}.$.${dataToUpdateKey}`]: dataToUpdateVal } },
        { new: true }
    )
    // return data

    return (getNested(actionId, arrName))
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






// createNested("64b7c81cab163bcddfc1860d", "schedules", {
//     date: "2023-06-22T00:00:00.000Z",
//     comments: "sagi and co",
//     status: "active",
// }).then(console.log)

// readDates().then(console.log)

//getNested("64b7c81cab163bcddfc1860d", "schedules", "64b6bd3491215e213dfe2bb4").then(r => console.log(r))

module.exports = { read, readOne, create, update, deleteOne, updateNested, readDates, getNested, createNested }
