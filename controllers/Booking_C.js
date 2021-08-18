var mongoose = require('mongoose');
var moment = require('moment');
const { parse } = require('json2csv');

var globalServices = require('../services/globalService');
var Schema = mongoose.Schema;
var constants = require('../models/modelConstants');
var BookingModel = mongoose.model(constants.BookingModel);
var TransactionModel = mongoose.model(constants.TransactionModel);
var UserModel = mongoose.model(constants.UserModel);



let bookingFunctions = {

  view: function (req, res, next) {


    let responseData = { pageTitle: 'Rumble | Dashboard' };

    VehicleBrandModel.find({ activeStatus: '1' }, (err, brand) => {
      if (err) {
        responseData.error = err;
        return res.render('component/vechile-master', responseData);
      } else {
        responseData.brand = brand;
        res.render('component/vechile-master', responseData);
      }
    })

  },



  bookingListApi: function (req, res, next) {
    console.log("request", req.body)
    const { userId } = req.body;
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "rideList": []
    }
    userModelId = new UserModel({ _id: userId })
    BookingModel.find({ _id: userModelId }).then((vehicle) => {
      console.log("vehicle", vehicle)
      if (vehicle) {

        data.responseCode = global.CONFIGS.responseCode.success
        data.responseMessage = global.CONFIGS.api.rideListSuccess;


        res.status(data.responseCode).send(data);
      }
    })

  },


  requestBookingApi: function (req, res, next) {
    console.log("request", req.body)
    const { customerId, sourceLat, sourceLong, destLat, destLong, SourceCountry, SourceState, SourceCity, SourcePincode, SourceAddress, DestCountry, DestState, DestCity, DestPincode, DestAddress, isdirectBooking,paymentMode,vehicleType } = req.body;
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "rideList": []
    }
    userModelId = new UserModel({ _id: customerId })

    sourceAdd = {
      country: SourceCountry,
      state: SourceState,
      city: SourceCity,
      pincode: SourcePincode,
      address: SourceAddress
    }

    destiAdd = {
      country: DestCountry,
      state: DestState,
      city: DestCity,
      pincode: DestPincode,
      address: DestAddress
    }
    BookingModel.create({
      customerId: userModelId,
      sourceLat: sourceLat,
      sourceLong: sourceLong,
      destLat: destLat,
      destLong: destLong,
      sourceAdd: sourceAdd,
      destiAdd: destiAdd,
      bookingCost: "",
      isdirectBooking: isdirectBooking,
      bookingStatus: 6,
      paymentMode: paymentMode,
      vehicleType:vehicleType

    }, (err, result) => {
        console.log("error",err)
      if (!err) {
        data.responseCode = global.CONFIGS.responseCode.success
        data.responseMessage = global.CONFIGS.api.rideRequestSuccess;


        res.status(data.responseCode).send(data);
      } else {

        data.responseCode = global.CONFIGS.responseCode.error
        data.responseMessage = global.CONFIGS.api.rideRequestFail;
        res.send(data)
        
      }
    })



  },


  bookingPaymentApi: function (req, res, next) {
    console.log("request", req.body)
    const { bookingId, driverId, customerId, transactionId, paymentStatus, paymentMode, transactionAmount } = req.body;
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",     
    }

    BookingModel.create({
      customerId: userModelId,
      sourceLat: sourceLat,
      sourceLong: sourceLong,
      destLat: destLat,
      destLong: destLong,
      sourceAdd: sourceAdd,
      destiAdd: destiAdd,
      bookingCost: "",
      isdirectBooking: isdirectBooking,
      bookingStatus: 6,
      paymentMode: paymentMode,
      vehicleType: vehicleType

    }, (err, result) => {
      console.log("error", err)
      if (!err) {
        data.responseCode = global.CONFIGS.responseCode.success
        data.responseMessage = global.CONFIGS.api.rideRequestSuccess;


        res.status(data.responseCode).send(data);
      } else {

        data.responseCode = global.CONFIGS.responseCode.error
        data.responseMessage = global.CONFIGS.api.rideRequestFail;
        res.send(data)

      }
    })



  },



};

module.exports = bookingFunctions;