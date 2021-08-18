var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var driverStatusSchema = new Schema(
    {
        driverId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        driverAval: {
            type: String,
            enum: ['0', '1'],
            default: '0'
        },
        driverCord: {
            type: {
                type: String,
                default: 'Point',
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            }
        }
    },
    {
        collection: constants.DriverStatusModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let driverStatus = mongoose.model(constants.DriverStatusModel, driverStatusSchema);
module.exports = driverStatus;
