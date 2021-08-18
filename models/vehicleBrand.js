var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleBrandsSchema = new Schema(
    {
        vehicleBrandName: {
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
        collection: constants.VehicleBrandModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let vehicleBrands = mongoose.model(constants.VehicleBrandModel, vehicleBrandsSchema);
module.exports = vehicleBrands;
