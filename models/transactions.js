var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionsSchema = new Schema(
    {
<<<<<<< HEAD
        
=======
        refrenceId: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },

        transactionId: {
            type: String,
            required: true
        },
        transactionAmount: {
            type: Number,
            required: false
        },
        transactionType: {
            type: Number,
            enum: ['1', '2', '3'],
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['0', '1', '2'],
            required: true
        },
        paymentMode: {
            type: String,
            enum: ['0', '1'],
            required: true
        }
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    },
    {
        collection: constants.TransactionModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let transactions = mongoose.model(constants.TransactionModel, transactionsSchema);
module.exports = transactions;
