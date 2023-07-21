const mongoose = require('mongoose');
require('./users.model')

const actionsSchema = new mongoose.Schema(

    {
        orderSource: {
            type: String
        },
        fundingSource: {
            type: String,
        },
        location: {
            type: String,
        },
        locationType: {
            type: Number,
        },
        days: [Number],
        startTime: {
            type: String,
        },
        endTime: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        status: {
            type: String,
            // enum : [""]
        },
        lecturer: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users"
        },
        actionType: {
            type: String
        },
        name: {
            type: String
        },
        files: [
            {
                fileName: {
                    type: String
                },
                fileType: {
                    type: String,
                },
                size: {
                    type: Number
                },
                createdDate: {
                    type: String,
                    default: Date.now
                }
            }
        ],
        tasks: [
            {
                deadline: {
                    type: Date
                },
                details: {
                    type: String,
                },
                isDone: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        users: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'users',
        }],
        schedules: [
            {
                date: {
                    type: Date,
                },
                lecturer: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'users',
                },
                comments: {
                    type: String,
                },
                status: {
                    type: String,
                    // enum:[""]
                }
            }
        ]
    }
)

const actionsModel = mongoose.model("actions", actionsSchema)
module.exports = actionsModel