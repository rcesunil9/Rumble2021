var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var supportTypeSchema = new Schema(
    {
       
        supportType: {
            type: String,
            required: true
        },
      
    },
    {
        collection: constants.SupportTypeModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let supportType = mongoose.model(constants.SupportTypeModel, supportTypeSchema);
module.exports = supportType;
