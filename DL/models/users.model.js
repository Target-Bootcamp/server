const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema(
  {
    userId: { type: Number },
    fName: { type: String },
    lName: { type: String, },
    phone: { type: Number },
    email: { type: String },
    participantNum: { type: Number },
    comments: { type: String },
    permission: {
      type: String,
      enum: ["admin", "student", "lecturer"],
      default: "student"

    }
  }
)

const usersModel = mongoose.model("users", usersSchema)
module.exports = usersModel