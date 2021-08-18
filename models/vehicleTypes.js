var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleTypesSchema = new Schema(
    {
        vehicleBrandId: {
            type: Schema.Types.ObjectId,
            ref: constants.VehicleBrandModel,
            required: true
        },
<<<<<<< HEAD
=======
        vehicleModelId: {
            type: Schema.Types.ObjectId,
            ref: constants.VehicleModelModel,
            required: true
        },
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
        vehicleTypeName: {
            type: String,
            required: true
        },
        activeStatus: {
            type: String,
            enum: ['0', '1', '2'],
            default: '0'
        }
    },
    {
        collection: constants.VehicleTypeModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let vehicleTypes = mongoose.model(constants.VehicleTypeModel, vehicleTypesSchema);
module.exports = vehicleTypes;
