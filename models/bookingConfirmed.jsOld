var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookingConfirmedSchema = new Schema(
    {
        bookingInitId: {
            type: Schema.Types.ObjectId,
            ref: constants.BookingInitModel,
            required: true
        },
        driverId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        vehicleId: {
            type: Schema.Types.ObjectId,
            ref: constants.VehicleModel,
            required: true
        },
        sourceCord: {
            type: {
                type: String,
                default: 'Point',
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            }
        },
        destiCord: {
            type: {
                type: String,
                default: 'Point',
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            }
        },
        sourceAdd: {
            country: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            }
        },
        destiAdd: {
            country: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            }
        },
        bookingCost: {
            type: Number,
            required: true
        },
        isdirectBooking: {
            type: String,
            enum: ['0', '1'],
            default: '0'
        },
        bookingOtp: {
            type: Number,
            required: true
        },
        bookingStatus: {
            type: String,
            enum: ['1', '2', '3', '4', '5'],
            default: '10'
        }
    },
    {
        collection: constants.BookingConfirmedModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

mongoose.model(constants.BookingConfirmedModel, bookingConfirmedSchema);
