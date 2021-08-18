var mongoose = require('mongoose');
var moment = require('moment');
const bcrypt = require('bcryptjs');
var randomstring = require('randomstring');
const { parse } = require('json2csv');
var multer = require('multer');

var globalServices = require('../services/globalService');
var upload = require("../services/multer");
var constants = require('../models/modelConstants');
var UserModel = mongoose.model(constants.UserModel);
var VehicleModel = mongoose.model(constants.VehicleModel);
var UserMetaModel = mongoose.model(constants.UserMetaModel);
var DriverMetaModel = mongoose.model(constants.DriverMetaModel);
var VehicleModel = mongoose.model(constants.VehicleModel);
var VehicleBrandModel = mongoose.model(constants.VehicleBrandModel);
var VehicleModelModel = mongoose.model(constants.VehicleModelModel);
var VehicleTypeModel = mongoose.model(constants.VehicleTypeModel);
var WalletModel = mongoose.model(constants.WalletModel);
var DriverMembershipModel = mongoose.model(constants.DriverMembershipModel);

let driverFunctions = {

    driverListMap: function (req, res, next) {

       
        let responseData = { pageTitle: 'Rumble | Dashboard' };
     

        responseData.data = {"data":"akjhajkh"};
        res.render('pages/driver/driver-listMap', responseData);
    },

    view: function (req, res, next) {
        res.render('pages/driver/driver-view', {
            pageTitle: 'Rumble | Driver'
        });
    },


    ListAjax: function (req, res, next) {
        console.log("req", req.body)
        var dtData = []


        VehicleModel.find().populate('driverId').then((vehicleData) => {
            if (vehicleData) {
                
                vehicleData.forEach(function (u) {
                    let data = [];
                    if (u.driverId['userOnline'] == '1') {
                        console.log("vehicle", u)
                        data.push(u.vehicleNumber);
                        data.push(u.driverId.driverLat);
                        data.push(u.driverId.driverLong);
                        
                        dtData.push(data)
                    }
                });
            }
            return Promise.all(dtData);
        }).then(function (vehicleData) {
            
            // send data to view
            let jsonData = JSON.stringify({

                "data": vehicleData
            });
            res.send(jsonData);
        });

        // UserModel.find({userOnline:1}).select().populate('').then((userDetail) => {
        //     if (userDetail) {
        //         userDetail.forEach(function (u) {
        //             let data = {};
        //             data.full_name = u.fullName;
        //             data.full_mobile = u.fullMobile;
        //             data.email = u.email;
        //             data.gender = u.gender;
        //             data.avatar = u.avatar;
        //             data.referral_code = u.referralCode;
        //             data.referred_by = u.referredBy;
        //             data.email_verified = (+u.isEmailVerified == 1 ? '<span class="badge badge-primary">Verified</span>' : '<span class="badge badge-secondary">Not Verify</span>');
        //             data.mobile_verified = (+u.isMobileVerified == 1 ? '<span class="badge badge-primary">Verified</span>' : '<span class="badge badge-secondary">Not Verify</span>');
        //             data.online = (+u.userOnline == '1' ? '<span class="badge badge-success">Online</span>' : '<span class="badge badge-danger">Offline</span>')
        //             if (+u.userStatus == CONFIGS.userStatus.active) {
        //                 data.user_status = '<span class="badge badge-primary">Active</span>';
        //             } else if (+u.userStatus == CONFIGS.userStatus.inactive) {
        //                 data.user_status = '<span class="badge badge-secondary">Inactive</span>';
        //             } else if (+u.userStatus == CONFIGS.userStatus.suspended) {
        //                 data.user_status = '<span class="badge badge-secondary">Suspend</span>';
        //             } else if (+u.userStatus == CONFIGS.userStatus.reported) {
        //                 data.user_status = '<span class="badge badge-warning">Reported</span>';
        //             } else if (+u.userStatus == CONFIGS.userStatus.blocked) {
        //                 data.user_status = '<span class="badge badge-dark">Blocked</span>';
        //             } else if (+u.userStatus == CONFIGS.userStatus.approved) {
        //                 data.user_status = '<span class="badge badge-primary">Approved</span>';
        //             } else if (+u.userStatus == CONFIGS.userStatus.unapproved) {
        //                 data.user_status = '<span class="badge badge-successbadge-secondary">Unapproved</span>';
        //             }
        //             data.created = moment(u.createdAt).format('MMMM Do YYYY');
        //             data.action = '<a class="btn btn-info btn-xs" href="/admin/driver/update/' + u.id + '"><i class="fas fa-pencil-alt"></i> Edit</a>';
        //             data.action += (+u.userStatus == 1 ? '<button class="btn btn-danger btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="2">Inactive</button>' : '<button class="btn btn-primary btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');

        //             dtData.push(data);
        //         });

        //     }
           
          
        //     return Promise.all(dtData);
        // }).then(function (userDetail) {
        //     // send data to view
        //     let jsonData = JSON.stringify({
                
        //         "data": userDetail
        //     });
        //     res.send(jsonData);
        // });


    },


};



module.exports = driverFunctions;