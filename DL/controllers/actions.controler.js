const actionsModel = require('../models/actions.model');
const getDates = require('../../functions/dates/index')
const dates = getDates.getAllDates()//=={ startMonth, endMonth, endWeek, iLZoneDate, Year, Month, Day}


//   ***base crud***
const read = async (filterBy) => {
    let data = await actionsModel.find(filterBy)
    return data
}
const readOne = async (filterBy) => {
    let data = await actionsModel.findOne(filterBy).populate("users")
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


//   ***Nested function***
const getNested = async (actionId, arrKey, kId) => {
    let data = await actionsModel.findOne({ _id: actionId })
    return (!kId ? data[arrKey] : { arrKey: data[arrKey].filter(val => val._id == kId), arrKey })
    // return data[arrKey]
}
const createNested = async (actionId, arrKey, newData) => {
    let data = await actionsModel.findOneAndUpdate(
        { _id: actionId },
        { $push: { [arrKey]: newData } },
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
    return ({ arrName, array: await getNested(actionId, arrName) })
}
const deleteNested = async (actionId, arrKey, keyId) => {
    let data = await actionsModel.findOneAndUpdate(
        { _id: actionId },
        { $pull: { [arrKey]: { _id: keyId } } },
        // { $push: { [arrKey]: newDta } },
        { new: true }
    )
        .select(`${arrKey} name`)// get & update 
    return data
}


//   ***dates functions***
const readActionsActiv = async (filterBy) => {//get activ actions
    let data = await actionsModel.find({ endDate: { "$gte": filterBy } })
    return data
}
const readNestedBetwinDates = async (date1, date2, arrKey, keyDate, toDay) => {
    // date1 = dates.startMonth
    // date2 = dates.endMonth
    // arrKey = "schedules"
    // keyDate = "date"
    // toDay = dates.Day
    // toDay = new Date().getDate()
    let data = await actionsModel.find(
        {
            [`${arrKey}.${keyDate}`]: {
                "$gte": date1,
                "$lt": date2
            }
        }, `_id  name ${arrKey}`//מביא מהאובייקט הקודם קיזס נבחרים
    ).lean().exec()
    let newdata = data.map((val, i) => {
        return {
            ...val, [arrKey]: val[arrKey]
                .filter(item => item[keyDate] < date2 && item[keyDate] > date1)
        }
        // val[arrKey].map((val) => {
        //     val[key] < date2 && val[key] > date1 ? newdata = [...newdata, val] : null
        // })
    })
    if (toDay) {//check if need today and filter
        const objects = []
        newdata.map((obj, i) => {
            objects.push({
                ...obj, [arrKey]: obj[arrKey]
                    .filter(inobj => inobj[keyDate].getDate() == toDay)
            })
        })
        newdata = objects.filter(val => val[arrKey].length ? val : null)
        return newdata
    }
    else { return newdata }
}
// readNestedBetwinDates().then(console.log)
const readActionsActivMonth = async (arrKey, dateKey, date1, date2) => {// get obj by in this month 
    let data = await actionsModel.find(
        {
            [`${arrKey}.${dateKey}`]: {
                "$gte": date1,
                "$lt": date2
            }
        }, `_id name ${arrKey}`//מביא מהאובייקט הקודם קיזס נבחרים
    ).lean().exec()
    let newdata = data.map((val, i) => {
        return {
            ...val, [arrKey]: val[arrKey]
                .filter(item => item[dateKey] < date2 && item[dateKey] > date1)
        }
    }
    )
    return data
}


//readActionsActivMonth("schedules", "date", dates.startMonth, dates.endMonth,).then(console.log)

// updateNested("64b7a5230366c31bd049cbf0", "schedules", "64b6bd3491215e213dfe2bb3", "comments", "acol letova10").then(console.log)
//readActionsActiv("2023-07-23T11:09:09.803Z").then(console.log)
// createNested("64b7c81cab163bcddfc1860d", "files", {
//     "fileType": "image",
//     "size": 139403,
//     "createdDate": "gdchgdf",
//     "fileName": "gggDDDDDf55555888999hff55gg.PNG",
//     "filePath": "./public/root/64b85dca1e5b771f92fcf237/20-07-23__23-06-55.574__gggg.PNG"
// }).then(console.log)
//deleteNested("64b85dca1e5b771f92fcf237","tasks","64b85dca1e5b771f92fcf23a").then(console.log)
// createNested("64b7c81cab163bcddfc1860d", "schedules", 
// {
//     date: "2023-06-22T00:00:00.000Z",
//     comments: "sagi andhjjhjhhhj co",
//     status: "active",
// }).then(console.log)

// readNestedBetwinDates().then(console.log)

// getNested("64b7c81cab163bcddfc1860d", "schedules", "64b6bd3491215e213dfe2bb4").then(r => console.log(r))
// getNested("64b7c81cab163bcddfc1860d", "files",).then(r => console.log(r))

module.exports = { read, readOne, create, update, deleteOne, updateNested, readNestedBetwinDates, getNested, createNested, deleteNested, readActionsActivMonth, readActionsActiv }
