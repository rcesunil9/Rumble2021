var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleSchema = new Schema(
    {
        driverId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        vehicleBrandId: {
            type: Schema.Types.ObjectId,
            ref: constants.VehicleBrandModel,
            required: true
        },
        vehicleModelId: {
            type: Schema.Types.ObjectId,
            ref: constants.VehicleModelModel,
            required: true
        },
        vehicleTypeId: {
            type: Schema.Types.ObjectId,
            ref: constants.VehicleTypeModel,
<<<<<<< HEAD
            required: true
=======
            required: false
        },
        vehicleType: {
            type: String,
            required: false
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
        },
        vehicleNumber: {
            type: String,
            required: true
        },
        vehicleYear: {
            type: Number,
            required: true
        },
        vehicleColor: {
            type: String,
            required: true
        },
        vehicleCapacity: {
            type: Number,
            required: true
        },
        activeStatus: {
            type: String,
            enum: ['0', '1'],
            default: '0'
        }
    },
    {
        collection: constants.VehicleModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let vehicle = mongoose.model(constants.VehicleModel, vehicleSchema);
module.exports = vehicle;
