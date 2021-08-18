var constants = require('./modelConstants');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema(
    {
       
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },

        message: {
            type: String,
            required: true
        },

    },
    {
        collection: constants.NotificationModel,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
);

let notifications = mongoose.model(constants.NotificationModel, notificationSchema);
module.exports = notifications;
