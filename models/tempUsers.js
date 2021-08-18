var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tempUsersSchema = new Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        countryCode: {
            type: Number
        },
        mobile: {
            type: Number,
            index: true
        },
        email: {
            type: String
        },
        status: {
            type: String,
            enum: ['1', '2', '3', '4', '5'],
            default: '2'
        },
        role: {
            type: String,
            enum: ['0', '1', '2', '3'],
            default: '0'
        },
        password: {
            type: String
        },
        gender: {
            type: String,
            enum: ['', 'female', 'male', 'other'],
            default: ''
        },
        avatar: {
            type: String
        },
        referralCode: {
            type: String
        },
        deviceType: {
            type: String
        },
        deviceToken: {
            type: String
        },
        deviceVer: {
            type: String
        },
        verifiyEmailToken: {
            type: String
        },
        verifiyMobileOtp: {
            type: Number
        },
        isEmailVerified: {
            type: String,
            enum: ['0', '1'],
            default: '0'
        },
        isMobileVerified: {
            type: String,
            enum: ['0', '1'],
            default: '0'
        },
        expTime: {
            type: Date
        },
        acceptTNC: {
            type: String,
            enum: ['0', '1'],
            default: '0'
        }
    },
    {
        collection: constants.TempUserModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let tempUsers = mongoose.model(constants.TempUserModel, tempUsersSchema);
module.exports = tempUsers;
