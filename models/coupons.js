var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var couponsSchema = new Schema(
    {
        couponCode: {
            type: String,
            require: true
        },
        discountValue: {
            type: Number,
            require: true
        },
        discountType: {
            type: String,
            enum: ['value', 'percentage'],
            require: true
        },
<<<<<<< HEAD
=======
        country: {
            type: String,
            require: true
        },
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
        activeStatus: {
            type: String,
            enum: ['0', '1', '2'],
            default: '0'
        }
    },
    {
        collection: constants.CouponModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

mongoose.model(constants.CouponModel, couponsSchema);
