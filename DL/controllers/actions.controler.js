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
    return (!kId ? data[arrKey] : { arrKey: data[arrKey].filter(val => val._id == kId), arrKey })//return 2 options all nested arr or current key
}
const createNested = async (actionId, arrKey, newData) => {
    let data = await actionsModel.findOneAndUpdate(
        { _id: actionId },
        { $push: { [arrKey]: newData } },
        { new: true }
    ).select(`${arrKey} name`)// work "get" & "update"-fun only
    return data
}
async function updateNested(actionId, arrName, objectId, dataToUpdateKey, dataToUpdateVal) {//update & set not active
    let data = await actionsModel.findOneAndUpdate(
        { _id: actionId, [`${arrName}._id`]: objectId },//get the current loc
        { $set: { [`${arrName}.$.${dataToUpdateKey}`]: dataToUpdateVal } },//update keys -or- set not active(delete)
        { new: true }
    )
    return ({ arrName, array: await getNested(actionId, arrName) })
}
const deleteNested = async (actionId, arrKey, keyId) => {
    let data = await actionsModel.findOneAndUpdate(
        { _id: actionId },
        { $pull: { [arrKey]: { _id: keyId } } },//remove the chosen obj
        { new: true }
    )
        .select(`${arrKey} name`)
    return data
}


//   ***dates functions***
const readActionsActive = async (filterBy) => {//get active actions
    let data = await actionsModel.find({ endDate: { "$gte": filterBy } })
    return data
}
const readNestedBetwinDates = async (date1, date2, arrKey, keyDate, toDay) => {
    let data = await actionsModel.find(
        {
            [`${arrKey}.${keyDate}`]: {//***get all full-action that stand by "dates" conditions
                "$gte": date1,
                "$lt": date2
            }
        }, `_id  name ${arrKey}`//***selct chosen keys from action obj's
    ).lean().exec()
    let newdata = data.map((val, i) => {//*** filter the only nested obj needed
        return {
            ...val, [arrKey]: val[arrKey]
                .filter(item => item[keyDate] < date2 && item[keyDate] > date1)//***filter nested by "conditions req"
        }
        // val[arrKey].map((val) => {//*** option b
        //     val[key] < date2 && val[key] > date1 ? newdata = [...newdata, val] : null
        // })
    })
    if (toDay) {//***check if need "today" and filter by day
        const objects = []
        newdata.map((obj, i) => {
            objects.push({
                ...obj, [arrKey]: obj[arrKey]
                    .filter(inobj => inobj[keyDate].getDate() == toDay)//filter "day condtion"
            })
        })
        newdata = objects.filter(val => val[arrKey].length ? val : null)//***clear obj whit empty arrays(get only current obj )
        return newdata
    }
    else { return newdata }
}

//     ***checks***

// readNestedBetwinDates(
//     dates.startMonth,
//     dates.endMonth,
//     "files",
//     "createdDate",
//     toDay = dates.Day
//     //toDay = new Date().getDate()
// ).then(console.log)

// readNestedBetwinDates(
//     dates.startMonth,
//     dates.endMonth,
//     "schedules",
//     "date",
//     // toDay = dates.Day
//     // toDay = new Date().getDate()
// ).then(console.log)

//updateNested("64b7a5230366c31bd049cbf0", "schedules", "64b6bd3491215e213dfe2bb3", "comments", "acol letova10").then(console.log)

//readActionsActive("2023-07-23T11:09:09.803Z").then(console.log)

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

module.exports = { read, readOne, create, update, deleteOne, updateNested, readNestedBetwinDates, getNested, createNested, deleteNested, readActionsActive }
