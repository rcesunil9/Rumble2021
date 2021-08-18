var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookingPaymentSchema = new Schema(
    {
<<<<<<< HEAD
        bookingConfirmedId: {
            type: Schema.Types.ObjectId,
            ref: constants.BookingConfirmedModel,
            required: true
        },
        driverId: {
=======
        refrenceId: {
            type: String,
            required: true
        },
        userId: {
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
<<<<<<< HEAD
        customerId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        transactionId: {
            type: Schema.Types.ObjectId,
            ref: constants.TransactionModel,
=======
      
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
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
            required: true
        },
        paymentStatus: {
            type: String,
<<<<<<< HEAD
=======
            enum: ['0', '1','2'],
            required: true
        },
        paymentMode: {
            type: String,
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
            enum: ['0', '1'],
            required: true
        }
    },
    {
        collection: constants.BookingPaymentModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

mongoose.model(constants.BookingPaymentModel, bookingPaymentSchema);
