const usersModel = require('../models/users.model');


const readone = async (filterBy) => await usersModel.findOne(filterBy)
const create = async (newData) => {
   let data = await usersModel.create(newData)
//    console.log(data);
   return data
}
const Delete = async (filterBy) => await usersModel.findByIdAndUpdate(filterBy, {IS: "? no active"})
const update = async (infoUpdate) => await usersModel.findByIdAndUpdate({ _id: infoUpdate._id }, infoUpdate.updateuser)


const read = async (model,condition)=>{
    let data = await model.find(condition)
    return data
}
const create2 = async (model,newData)=>{
    let data = await model.create(newData)
    return data
}

module.exports = { create2, read, readone, create, Delete, update }
