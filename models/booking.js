var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookingSchema = new Schema(
    {

        driverId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: false
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        vehicleId: {
            type: Schema.Types.ObjectId,
            ref: constants.VehicleModel,
            required: false
        },
        sourceLat: {
            type: String,
            default: null,
        },
        sourceLong: {
            type: String,
            default: null,
        },
        destLat: {
            type: String,
            default: null,
        },
        destLong: {
            type: String,
            default: null,
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
            },
            pincode: {
                type: String,
                required: false
            },
            address: {
                type: String,
                required: false
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
            },
            pincode: {
                type: String,
                required: false
            },
            address: {
                type: String,
                required: false
            }
        },
        bookingCost: {
            type: Number,
            required: false
        },
        isdirectBooking: {
            type: String,
            enum: ['0', '1'],
            default: '0'
        },
        bookingOtp: {
            type: Number,
            required: false
        },
        bookingStatus: {
            type: String,
            enum: ['1', '2', '3', '4', '5','6'],
            default: '10'
        },
        requestDate: {
            type: Date,
            required: false
        },
        confirmDate: {
            type: Date,
            required: false
        },
        startDate: {
            type: Date,
            required: false
        },
        endDate: {
            type: Date,
            required: false
        },
        paymentMode: {
            type: Number,
            required: true
        },
        vehicleType: {
            type: String,
            required: true
        },
    },
    {
        collection: constants.BookingModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

mongoose.model(constants.BookingModel, bookingSchema);
