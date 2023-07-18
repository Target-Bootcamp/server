const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema(
    {
      userId: {type:Number, required:true},
      fName: {type:String, required:true},
      lName: {type:String, required:true,},
      phone: {type:Number, required:true},
      email: {type:String, required:true},
      participantNum:{type:Number, required:true},
      comments: {type:String},
      permission: {type:String, required:true}
    }
)

const usersModel = mongoose.model("users", usersSchema)
module.exports = usersModel