var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sTktDriverSchema = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        tktDesc: {
            type: String,
            required: true
        },
        tktStatus: {
            type: String,
            enum: ['0', '1', '2'],
            default: '1'
        },
        replies: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: constants.UserModel,
                    required: true
                },
                replyDesc: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        collection: constants.StktDriverModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let sTktDriver = mongoose.model(constants.StktDriverModel, sTktDriverSchema);
module.exports = sTktDriver;
