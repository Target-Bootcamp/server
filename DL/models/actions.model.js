const mongoose = require('mongoose');


const actionsSchema = new mongoose.Schema(
    {

    }
)

const actionsModel = mongoose.model("actions", actionsSchema)
module.exports =actionsModel