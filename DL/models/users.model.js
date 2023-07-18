const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema(
    {
      userId: {type:Number, required:true,minLength:3},
      fName: {type:String, required:true,minLength:2},
      lName: {type:String, required:true,minLength:2},
      phone: {type:Number, required:true,minLength:9},
      email: {type:String, required:true,minLength:9},
      participantNum:{type:Number, required:true,minLength:3},
      comments: {type:String},
      permission: {type:String, required:true}
    }
)

const usersModel = mongoose.model("users", usersSchema)
module.exports = usersModel