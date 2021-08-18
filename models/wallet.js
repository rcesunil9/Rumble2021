var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var walletSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        amountAval: {
            type: Number,
            default: 0
        }
    },
    {
        collection: constants.WalletModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let wallet = mongoose.model(constants.WalletModel, walletSchema);
module.exports = wallet;
