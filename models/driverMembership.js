var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var driverMembershipSchema = new Schema(
    {
        driverId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        membershipId: {
            type: Schema.Types.ObjectId,
            ref: constants.MembershipModel,
            required: true
        },
        transactionId: {
            type: Schema.Types.ObjectId,
            ref: constants.TransactionModel,
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['0', '1'],
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    },
    {
        collection: constants.DriverMembershipModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let driverMembership = mongoose.model(constants.DriverMembershipModel, driverMembershipSchema);
module.exports = driverMembership;
