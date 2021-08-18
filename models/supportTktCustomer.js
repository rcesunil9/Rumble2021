var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sTktCustomerSchema = new Schema(
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
            default: '0'
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
        collection: constants.StktCustomerModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let sTktCustomer = mongoose.model(constants.StktCustomerModel, sTktCustomerSchema);
module.exports = sTktCustomer;
