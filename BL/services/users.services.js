const {deleteOne,create,read,update,} = require("../../DL/controllers/users.controler")

const createFun = async(data)=>{
    if (!data) throw "no data "
    let action = await create(data)
    return action
} 
const readFun = async(filerArray)=>{
    if (!filerArray) throw "no data "
    let action = await read(filerArray)
    return action
}
const deleteFun = async(id)=>{
    if (!id) throw "no data "
    let action = await deleteOne(id)
    return action
} 
const updateFun = async(id,data)=>{
    let action = await update(id,data)
    if (!data) throw "no data "
    else if (!id) throw "no data "
    else if (!action) throw "no data "
    return action
}
module.exports = {createFun,readFun,deleteFun,updateFun}






