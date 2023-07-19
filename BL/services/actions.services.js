const {create,del,read,update, updateNested} = require("../../DL/controllers/actions.controler")

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
    let action = await del(id)
    if (!filerArray) throw "no data "
    return action
} 
const updateFun = async(id,data)=>{
    return "nothing here yet"
} 




module.exports = {createFun,readFun,deleteFun,updateFun}

