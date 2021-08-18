var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userMetaSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        walletId: {
            type: Schema.Types.ObjectId,
            ref: constants.WalletModel,
            default: null
        },
        deviceType: {
            type: String,
            required: true
        },
        deviceToken: {
            type: String,
            required: true
        },
        deviceVer: {
            type: String,
            required: true
        }
    },
    {
        collection: constants.UserMetaModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let userMeta = mongoose.model(constants.UserMetaModel, userMetaSchema);
module.exports = userMeta;
