var mongoose = require('mongoose');
var moment = require('moment');
const { parse } = require('json2csv');

var globalServices = require('../services/globalService');
var constants = require('../models/modelConstants');
var StktCustomerModel = mongoose.model(constants.StktCustomerModel);
var StktDriverModel = mongoose.model(constants.StktDriverModel);
var SupportTypeModel = mongoose.model(constants.SupportTypeModel);
var UserModel = mongoose.model(constants.UserModel);
var NotificationModel = mongoose.model(constants.NotificationModel);

let couponMasterFunctions = {

  viewSCustomer: function (req, res, next) {
    res.render('pages/support-ticket/customer-ticket', {
      pageTitle: 'Rumble | Support Ticket'
    });
  },


  notificationTypeListApi: function (req, res, next) {

    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "notificationList": []
    }
    var UserModelId = new UserModel({ _id: req.body.userId })
    NotificationModel.find({ userId: UserModelId._id}).select({name:1,message:1,createdAt:1}).then((notification) => {
      console.log("notification", notification)
      if (notification) {

        data.responseCode = global.CONFIGS.responseCode.success
        data.responseMessage = global.CONFIGS.api.notificationListSuccess;
        data.notificationList = notification

        res.status(data.responseCode).send(data);
      }
    })

  },



  addNotificationApi: function (req, res, next) {
    const { name, userId, message } = req.body
    console.log("req", req.body)
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
    }
    var UserModelId = new UserModel({ _id: userId })
    NotificationModel.create({
      name: name,
      userId: UserModelId._id,
      message: message

    }, (err, result) => {
      console.log("err", err)
      if (!err) {

        data.responseCode = global.CONFIGS.responseCode.success
        data.responseMessage = global.CONFIGS.api.addSupportTypeSuccess;
        res.status(data.responseCode).send(data);
      } else {

        data.responseCode = global.CONFIGS.responseCode.error
        data.responseMessage = global.CONFIGS.api.addSupportTypeFail;
        res.send(data)
      }
    })

  },

};

module.exports = couponMasterFunctions;