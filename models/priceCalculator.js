var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var priceCalculatorSchema = new Schema(
    {
        baseFare: {
            type: Number,
            require: true
        },
        baseFareUptoKm: {
            type: Number,
            require: true
        },
        rideFarePerKm: {
            type: Number,
            require: true
        },
        minuteFare: {
            type: Number,
            require: true
        },
        convinienceFare: {
            type: Number,
            require: true
        },
        activeStatus: {
            type: String,
            enum: ['0', '1'],
            default: '0'
        }
    },
    {
        collection: constants.PriceCalculatorModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let priceCalculator = mongoose.model(constants.PriceCalculatorModel, priceCalculatorSchema);
module.exports = priceCalculator;
