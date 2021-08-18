var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var enrSchema = new Schema(
    {
        referType: {
            type: String,
            enum: ['1', '2', '3'],
            required: true
        },
        amount: {
            type: Number,
            default: 0
        },
        afterCompleteFirstRide: {
            type: String,
            enum: ['0', '1'],
            default: '0'
        },
        isDTCRefer: {
            type: String,
            enum: ['0', '1'],
            default: '0'
        },
        dtcReferDurationInMonth: {
            type: Number,
            default: 0
        },
        activeStatus: {
            type: String,
            enum: ['0', '1', '2'],
            default: '0'
        }
    },
    {
        collection: constants.EnRModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let enr = mongoose.model(constants.EnRModel, enrSchema);
module.exports = enr;
