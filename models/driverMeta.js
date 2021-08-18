var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverMetaSchema = new Schema(
    {
        driverId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        activerMembershipId: {
            type: Schema.Types.ObjectId,
            ref: constants.DriverMembershipModel,
            default: null
        },
        aadharFront: {
            type: String,
            default: null
        },
        aadharBack: {
            type: String,
            default: null
        },
        aadharNumber: {
<<<<<<< HEAD
            type: Number,
=======
            type: String,
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
            default: null
        },
        dlFront: {
            type: String,
            default: null
        },
        dlBack: {
            type: String,
            default: null
        },
        motorIns: {
            type: String,
            default: null
        },
        carriagePermit: {
            type: String,
            default: null
        },
        policeVerifyPermit: {
            type: String,
            default: null
        }
    },
    {
        collection: constants.DriverMetaModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let DriverMeta = mongoose.model(constants.DriverMetaModel, DriverMetaSchema);
module.exports = DriverMeta;
