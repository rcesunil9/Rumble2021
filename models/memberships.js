var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var membershipsSchema = new Schema(
    {
        membershipName: {
            type: String,
            required: true
        },
        membershipDesc: {
            type: String,
            required: true
        },
        membershipDuration: {
            type: Number,
            required: true
        },
        membershipCost: {
            type: Number,
            required: true
        },
        activeStatus: {
            type: String,
            enum: ['0', '1', '2'],
            default: '0'
        }
    },
    {
        collection: constants.MembershipModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let memberships = mongoose.model(constants.MembershipModel, membershipsSchema);
module.exports = memberships;
