const {deleteOne,create,read,update,} = require("../../DL/controllers/users.controler")

const createFun = async(data)=>{
    let action = await create(data)
    if (!data) throw "no data "
    return action
} 
const readFun = async(filerArray)=>{
    let action = await read(filerArray)
    if (!filerArray) throw "no data "
    return action
}
const deleteFun = async(id)=>{
    let action = await deleteOne(id)
    if (!filerArray) throw "no data "
    return action
} 
const updateNestedFun = async(actionId, arrName, objectId, newData)=>{
    let action = await updateNested(actionId, arrName, objectId, newData)
    if (!filerArray) throw "no data"
    return action
} 

const updateFun = async(id,data)=>{
    let action = await update(id,data)
    if (!filerArray) throw "no data "
    return action
}






