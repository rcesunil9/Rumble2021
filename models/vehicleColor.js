var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleColorsSchema = new Schema(
    {
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
        vehicleColorName: {
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
        collection: constants.VehicleColorModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

mongoose.model(constants.VehicleColorModel, vehicleColorsSchema);

