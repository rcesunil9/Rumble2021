var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookingInitSchema = new Schema(
    {
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
        sourceCord:{
            type:{
                type:String,
                default:'Point',
            },
            coordinates:{
                type:[Number],
                default:[0,0]
            }
        },
        destiCord:{
            type:{
                type:String,
                default:'Point',
            },
            coordinates:{
                type:[Number],
                default:[0,0]
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
        }
    },
    {
        collection: constants.BookingInitModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

mongoose.model(constants.BookingInitModel, bookingInitSchema);