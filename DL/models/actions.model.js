const mongoose = require('mongoose');


const actionsSchema = new mongoose.Schema(


    {
        orderSource: {
            type: String,
            required: true
        },
        fundingSource: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        locationType: {
            type: Number,
            required: true
        },
        days: {
            type: [Number],
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        status: {
            type: Number,
            required: true
        },
        lecturer: {
            type: String,
            required: true
        },
        actionType: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        files: [
            {
                fileName: {
                    type: String,
                    required: true
                },
                fileType: {
                    type: String,
                    required: true
                },
                size: {
                    type: String,
                    required: true
                },
                createdDate: {
                    type: Date,
                    required: true
                }
            }
        ],
        tasks: [
            {
                deadline: {
                    type: Date,
                    required: true
                },
                details: {
                    type: String,
                    required: true
                },
                isDone: {
                    type: Boolean,
                    required: true
                }
            }
        ],
        users: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
        }],
        schedules: [
            {
                date: {
                    type: Date,
                    required: true
                },
                lecturer: {
                    type: String,
                    required: true
                },
                comments: {
                    type: String,
                    required: true
                },
                status: {
                    type: String,
                    required: true
                }
            }
        ]
    }
)

const actionsModel = mongoose.model("actions", actionsSchema)
module.exports = actionsModel