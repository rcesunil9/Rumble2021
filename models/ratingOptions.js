var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingOptionsSchema = new Schema(
    {
        ratingOptName: {
            type: String,
            require: true
        },
        activeStatus: {
            type: String,
            enum: ['0', '1'],
            default: '0'
        }
    },
    {
        collection: constants.RatingOptionModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let ratingOptions = mongoose.model(constants.RatingOptionModel, ratingOptionsSchema);
module.exports = ratingOptions;
