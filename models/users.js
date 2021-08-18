var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            index: true
        },
        lastName: {
            type: String,
            default: null
        },
        countryCode: {
            type: Number,
            required: true
        },
        mobile: {
            type: Number,
            required: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            index: true
        },
        password: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ['', 'female', 'male', 'other'],
            default: ''
        },
        avatar: {
            type: String,
            default: null,
            get: avatarGetter
        },
        referralCode: {
            type: String,
            default: null,
        },
        referredBy: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            default: null,
        },
        verifiyEmailToken: {
            type: String,
            required: true
        },
        verifiyMobileOtp: {
            type: Number,
            required: true
        },
        expTime: {
            type: Date,
            default: null
        },
        isEmailVerified: {
            type: String,
            enum: ['0', '1'],
            default: '0',
            index: true
        },
        isMobileVerified: {
            type: String,
            enum: ['0', '1'],
            default: '0',
            index: true
        },
        acceptTNC: {
            type: String,
            enum: ['0', '1'],
            default: '0',
            index: true
        },
        userRole: {
            type: String,
            enum: ['0', '1', '2', '3'],
            default: '0',
            index: true
        },
        isRegistered: {
            type: String,
            enum: ['0', '1'],
            default: '0',
            index: true
        },
        userMetaId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserMetaModel,
            default: null
        },
        driverMetaId: {
            type: Schema.Types.ObjectId,
            ref: constants.DriverMetaModel,
            default: null
        },
        userStatus: {
            type: String,
            enum: ['1', '2', '3', '4', '5', '6', '7'],
            default: '2',
            index: true
        },
        userOnline: {
            type: String,
            enum: ['0', '1'],
            default: '0',
            index: true
        },
<<<<<<< HEAD
=======
        driverLat: {
            type: String,
            default: null
        },
        driverLong: {
            type: String,
            default: null
        }, address: {
            type: String,
            default: null
        },
        state: {
            type: String,
            default: null
        },
        country: {
            type: String,
            default: null
        },
        pincode: {
            type: String,
            default: null
        },
        onlineTime: {
            type: Date,
            default: null
        },
        onlineMinutes: {
            type: Number,
            default: 0
        },
        totalDistance: {
            type: Number,
            default: 0
        },
        earning: {
            type: Number,
            default: 0
        },
        rideEarning: {
            type: Number,
            default: 0
        },
        walletBalance: {
            type: Number,
            default: 0
        },


>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    },
    {
        collection: constants.UserModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true }
    }
);

usersSchema.virtual('fullName').get(function () {
    return [this.firstName, this.lastName].join(' ');
});

usersSchema.virtual('fullMobile').get(function () {
    return [this.countryCode, this.mobile].join(' ');
});

<<<<<<< HEAD
function avatarGetter (avatar) {
=======
function avatarGetter(avatar) {
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    if (avatar) {
        return process.env.WEBURL + '/' + avatar;
    } else {
        return process.env.WEBURL + '/images/user2-160x160.jpg';
    }
}

mongoose.model(constants.UserModel, usersSchema);
