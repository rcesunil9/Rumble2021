var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookingRatingSchema = new Schema(
    {
        bookingConfirmedId: {
            type: Schema.Types.ObjectId,
<<<<<<< HEAD
            ref: constants.BookingConfirmedModel,
=======
            ref: constants.BookingModel,
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
            required: true
        },
        driverId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        ratingStar: {
            type: Number,
            required: true
        },
        rateDescOption: [{ type: Schema.Types.ObjectId, ref: constants.RatingOptionModel }],
        rateDesc: {
            type: String,
            default: null
        }
    },
    {
        collection: constants.BookingRatingModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

mongoose.model(constants.BookingRatingModel, bookingRatingSchema);
