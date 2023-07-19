const {create,deleteOne,read,updateNested,update} = require("../../DL/controllers/actions.controler")

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
    
    const dataToUpdateArrys = Object.entries(newData)
    const dataToUpdateArrysKey=dataToUpdateArrys[0][0]
    const dataToUpdateArrysVal=dataToUpdateArrys[0][1]
    
    let action = await updateNested(actionId, arrName, objectId,dataToUpdateArrysKey,dataToUpdateArrysVal )
    if (!filerArray) throw "no data"
    return action
} 

const updateFun = async(id,data)=>{
    let action = await update(id,data)
    if (!filerArray) throw "no data "
    return action
}

module.exports = {createFun,readFun,deleteFun,updateNestedFun,updateFun}

