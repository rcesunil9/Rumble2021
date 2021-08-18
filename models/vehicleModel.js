var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleModelsSchema = new Schema(
    {

        vehicleBrandId: {
            type: Schema.Types.ObjectId,
            ref: constants.VehicleBrandModel,
            required: true
        },
<<<<<<< HEAD
=======
        vehicleType: {
            type: String,
            default: ''
        },
      
        
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
        vehicleModelName: {
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
        collection: constants.VehicleModelModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let vehicleModels = mongoose.model(constants.VehicleModelModel, vehicleModelsSchema);
module.exports = vehicleModels;
