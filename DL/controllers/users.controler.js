const usersModel = require('../models/users.model');




const read = async (filterBy) => {
    let data = await usersModel.find(filterBy)
    return data
}

const create = async (newData) => {
   let data = await usersModel.create(newData)
   return data
}
const deleteOne = async (filterBy) => {
    let data = await usersModel.findByIdAndUpdate(filterBy, {IS: "? no active"})
    return data
}
const update = async (id,newData) => {
    let data =await usersModel.findByIdAndUpdate(id,newData)
    return data
}


module.exports = {read, create, deleteOne, update }
