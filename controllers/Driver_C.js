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
var UserMetaModel = mongoose.model(constants.UserMetaModel);
var DriverMetaModel = mongoose.model(constants.DriverMetaModel);
var VehicleModel = mongoose.model(constants.VehicleModel);
var VehicleBrandModel = mongoose.model(constants.VehicleBrandModel);
var VehicleModelModel = mongoose.model(constants.VehicleModelModel);
var VehicleTypeModel = mongoose.model(constants.VehicleTypeModel);
var WalletModel = mongoose.model(constants.WalletModel);
var DriverMembershipModel = mongoose.model(constants.DriverMembershipModel);

let driverFunctions = {

  driverList: function (req, res, next) {
    res.render('pages/driver/driver-list', {
      pageTitle: 'Rumble | Driver'
    });
  },

<<<<<<< HEAD
  driverListAjax: function (req, res, next) {
=======
  // driverListAjax: function (req, res, next) {

  //   let { fromDate, endDate, statusId, start, length, onlineId } = req.body;
  //   let dtData = [],
  //     queryOb = {},
  //     sortOb = {},
  //     recordsTotal = 0,
  //     recordsFiltered = 0;

  //   // query builder : sort
  //   let columns = ['', '', 'firstName', 'mobile', 'email', 'gender', '', 'referralCode', 'referredBy', 'createdAt'];
  //   let column = 'firstName';
  //   if (columns[req.body['order[0][column]']] != undefined) {
  //     column = columns[req.body['order[0][column]']];
  //   }
  //   sortOb[column] = (req.body['order[0][dir]'].toUpperCase() == 'ASC' ? 1 : -1);
  //   // query builder : pagination
  //   let pagination = { skip: +start, limit: +length };
  //   // query builder : serach by text
  //   if (req.body['search[value]']) {
  //     let searchText = new RegExp(req.body['search[value]']);
  //     queryOb.$or = [
  //       { firstName: { $regex: new RegExp(searchText), $options: 'i' } },
  //       { email: { $regex: new RegExp(searchText), $options: 'i' } }
  //     ];
  //     if (+req.body['search[value]']) {
  //       queryOb.$or.push({ mobile: +req.body['search[value]'] });
  //     }
  //   }
  //   // query builder : sort by status

  //   if (+statusId) { queryOb.userStatus = statusId; }
  //   if (onlineId != "") { queryOb.userOnline = onlineId; }
  //   // query builder : sort from date
  //   if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
  //   // query builder : sort end date
  //   if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }
  //   // query builder : role driver
  //   queryOb.userRole = '' + global.CONFIGS.role.driver;
  //   UserModel.count({}, function (err, c) {
  //     if (c == undefined) { c = 0; }
  //     recordsTotal = c;
  //     UserModel.count(queryOb, function (err, c) {
  //       if (c == undefined) { c = 0; }
  //       recordsFiltered = c;
  //       // driver

  //       UserModel.find(queryOb).select({ firstName: 1, lastName: 1, fullName: 1, countryCode: 1, mobile: 1, fullMobile: 1, email: 1, gender: 1, avatar: 1, referralCode: 1, referredBy: 1, isEmailVerified: 1, isMobileVerified: 1, userStatus: 1, userMetaId: 1, driverMetaId: 1, createdAt: 1, userOnline: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: "driverMetaId", model: constants.DriverMetaModel, populate: { path: "activerMembershipIdoffer", model: constants.DriverMembershipModel, match: { endDate: { $gte: new Date() }, startDate: { $lte: new Date() }, paymentStatus: '1' } } }).populate({ path: "userMetaId", model: constants.UserMetaModel, populate: { path: "walletId", model: constants.WalletModel } }).then((userDetail) => {
  //         if (userDetail) {


  //           function getDriverData(id) {
  //             return new Promise((resolve, reject) => {

  //               DriverMembershipModel.find({ driverId:id }).then((membership) => {
  //                 resolve(membership)

  //               });

  //             })
  //           }


  //           getUserDetail(userDetail).then((response) => {

  //             console.log("response",response)
  //           })
  //           async function getUserDetail(userDetail) {

  //             userDetail.map( u => {
  //               let data = {};
  //               data.full_name = u.fullName;
  //               data.full_mobile = u.fullMobile;
  //               data.email = u.email;
  //               data.gender = u.gender;
  //               data.avatar = u.avatar;
  //               data.referral_code = u.referralCode;
  //               data.referred_by = u.referredBy;
  //               data.email_verified = (+u.isEmailVerified == 1 ? '<span class="badge badge-primary">Verified</span>' : '<span class="badge badge-secondary">Not Verify</span>');
  //               data.mobile_verified = (+u.isMobileVerified == 1 ? '<span class="badge badge-primary">Verified</span>' : '<span class="badge badge-secondary">Not Verify</span>');
  //               data.online = (+u.userOnline == '1' ? '<span class="badge badge-success">Online</span>' : '<span class="badge badge-danger">Offline</span>')
  //               if (+u.userStatus == CONFIGS.userStatus.active) {
  //                 data.user_status = '<span class="badge badge-primary">Active</span>';
  //               } else if (+u.userStatus == CONFIGS.userStatus.inactive) {
  //                 data.user_status = '<span class="badge badge-secondary">Inactive</span>';
  //               } else if (+u.userStatus == CONFIGS.userStatus.suspended) {
  //                 data.user_status = '<span class="badge badge-secondary">Suspend</span>';
  //               } else if (+u.userStatus == CONFIGS.userStatus.reported) {
  //                 data.user_status = '<span class="badge badge-warning">Reported</span>';
  //               } else if (+u.userStatus == CONFIGS.userStatus.blocked) {
  //                 data.user_status = '<span class="badge badge-dark">Blocked</span>';
  //               } else if (+u.userStatus == CONFIGS.userStatus.approved) {
  //                 data.user_status = '<span class="badge badge-primary">Approved</span>';
  //               } else if (+u.userStatus == CONFIGS.userStatus.unapproved) {
  //                 data.user_status = '<span class="badge badge-successbadge-secondary">Unapproved</span>';
  //               }
  //               data.created = moment(u.createdAt).format('MMMM Do YYYY');
  //               data.membership = (+u.userOnline == '1' ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-danger">Expired</span>')
  //               //  data.membership +=  '</br><button class="btn btn-primary btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="1">View</button>';

  //               data.action = '<a class="btn btn-info btn-xs" href="/admin/driver/update/' + u.id + '"><i class="fas fa-pencil-alt"></i> Edit</a>';
  //               data.action += (+u.userStatus == 1 ? '<button class="btn btn-danger btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="2">Inactive</button>' : '<button class="btn btn-primary btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');



  //              // getDriverData(u.driverId._id);


  //               dtData.push(data);
  //             });
  //             return dtData
  //           }



  //         }
  //         if (Object.keys(sortOb)[0] == 'mobile') {
  //           if (sortOb.mobile == 1) {
  //             dtData.sort(compareValues('full_mobile', 'asc'))
  //           } else {
  //             dtData.sort(compareValues('full_mobile', 'desc'))
  //           }
  //         }
  //         return Promise.all(dtData);
  //       }).then(function (userDetail) {
  //         // send data to view
  //         let jsonData = JSON.stringify({
  //           "draw": req.body.draw,
  //           "recordsFiltered": recordsFiltered,
  //           "recordsTotal": recordsTotal,
  //           "data": userDetail
  //         });
  //         res.send(jsonData);
  //       });
  //     });
  //   });
  // },


  driverListAjax: function (req, res, next) {

>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    let { fromDate, endDate, statusId, start, length, onlineId } = req.body;
    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

<<<<<<< HEAD
=======

    function calculateDays(startDate, endDate) {
      var start_date = moment(startDate, 'YYYY-MM-DD');
      var end_date = moment(endDate, 'YYYY-MM-DD');
      var duration = moment.duration(end_date.diff(start_date));
      var days = parseInt(duration.asDays()) + 1;
      return days;
    }
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    // query builder : sort
    let columns = ['', '', 'firstName', 'mobile', 'email', 'gender', '', 'referralCode', 'referredBy', 'createdAt'];
    let column = 'firstName';
    if (columns[req.body['order[0][column]']] != undefined) {
      column = columns[req.body['order[0][column]']];
    }
    sortOb[column] = (req.body['order[0][dir]'].toUpperCase() == 'ASC' ? 1 : -1);
    // query builder : pagination
    let pagination = { skip: +start, limit: +length };
    // query builder : serach by text
    if (req.body['search[value]']) {
      let searchText = new RegExp(req.body['search[value]']);
      queryOb.$or = [
        { firstName: { $regex: new RegExp(searchText), $options: 'i' } },
        { email: { $regex: new RegExp(searchText), $options: 'i' } }
      ];
      if (+req.body['search[value]']) {
        queryOb.$or.push({ mobile: +req.body['search[value]'] });
      }
    }
    // query builder : sort by status

    if (+statusId) { queryOb.userStatus = statusId; }
    if (onlineId != "") { queryOb.userOnline = onlineId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }
    // query builder : role driver
    queryOb.userRole = '' + global.CONFIGS.role.driver;
    UserModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      UserModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // driver

<<<<<<< HEAD
        console.log("query",queryOb)
        console.log("sortob", sortOb)
        UserModel.find(queryOb).select({ firstName: 1, lastName: 1, fullName: 1, countryCode: 1, mobile: 1, fullMobile: 1, email: 1, gender: 1, avatar: 1, referralCode: 1, referredBy: 1, isEmailVerified: 1, isMobileVerified: 1, userStatus: 1, userMetaId: 1, driverMetaId: 1, createdAt: 1, userOnline: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: "driverMetaId", model: constants.DriverMetaModel, populate: { path: "activerMembershipIdoffer", model: constants.DriverMembershipModel, match: { endDate: { $gte: new Date() }, startDate: { $lte: new Date() }, paymentStatus: '1' } } }).populate({ path: "userMetaId", model: constants.UserMetaModel, populate: { path: "walletId", model: constants.WalletModel } }).then((userDetail) => {
          if (userDetail) {
            userDetail.forEach(function (u) {
              let data = {};
              data.full_name = u.fullName;
              data.full_mobile = u.fullMobile;
              data.email = u.email;
              data.gender = u.gender;
              data.avatar = u.avatar;
              data.referral_code = u.referralCode;
              data.referred_by = u.referredBy;
              data.email_verified = (+u.isEmailVerified == 1 ? '<span class="badge badge-primary">Verified</span>' : '<span class="badge badge-secondary">Not Verify</span>');
              data.mobile_verified = (+u.isMobileVerified == 1 ? '<span class="badge badge-primary">Verified</span>' : '<span class="badge badge-secondary">Not Verify</span>');
              data.online = (+u.userOnline == '1' ? '<span class="badge badge-success">Online</span>' : '<span class="badge badge-danger">Offline</span>')
              if (+u.userStatus == CONFIGS.userStatus.active) {
                data.user_status = '<span class="badge badge-primary">Active</span>';
              } else if (+u.userStatus == CONFIGS.userStatus.inactive) {
                data.user_status = '<span class="badge badge-secondary">Inactive</span>';
              } else if (+u.userStatus == CONFIGS.userStatus.suspended) {
                data.user_status = '<span class="badge badge-secondary">Suspend</span>';
              } else if (+u.userStatus == CONFIGS.userStatus.reported) {
                data.user_status = '<span class="badge badge-warning">Reported</span>';
              } else if (+u.userStatus == CONFIGS.userStatus.blocked) {
                data.user_status = '<span class="badge badge-dark">Blocked</span>';
              } else if (+u.userStatus == CONFIGS.userStatus.approved) {
                data.user_status = '<span class="badge badge-primary">Approved</span>';
              } else if (+u.userStatus == CONFIGS.userStatus.unapproved) {
                data.user_status = '<span class="badge badge-successbadge-secondary">Unapproved</span>';
              }
              data.created = moment(u.createdAt).format('MMMM Do YYYY');
              data.action = '<a class="btn btn-info btn-xs" href="/admin/driver/update/' + u.id + '"><i class="fas fa-pencil-alt"></i> Edit</a>';
              data.action += (+u.userStatus == 1 ? '<button class="btn btn-danger btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="2">Inactive</button>' : '<button class="btn btn-primary btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');

              dtData.push(data);
            });

          }
          return Promise.all(dtData);
        }).then(function (userDetail) {
          // send data to view
          let jsonData = JSON.stringify({
            "draw": req.body.draw,
            "recordsFiltered": recordsFiltered,
            "recordsTotal": recordsTotal,
            "data": userDetail
          });
          res.send(jsonData);
        });
      });
    });
  },

=======
        UserModel.find(queryOb).select({ firstName: 1, lastName: 1, fullName: 1, countryCode: 1, mobile: 1, fullMobile: 1, email: 1, gender: 1, avatar: 1, referralCode: 1, referredBy: 1, isEmailVerified: 1, isMobileVerified: 1, userStatus: 1, userMetaId: 1, driverMetaId: 1, createdAt: 1, userOnline: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: "driverMetaId", model: constants.DriverMetaModel, populate: { path: "activerMembershipIdoffer", model: constants.DriverMembershipModel, match: { endDate: { $gte: new Date() }, startDate: { $lte: new Date() }, paymentStatus: '1' } } }).populate({ path: "userMetaId", model: constants.UserMetaModel, populate: { path: "walletId", model: constants.WalletModel } }).then((userDetail) => {
          if (userDetail) {
            var ids = []

            Promise.all(
              userDetail.map(u => {
                var data = {}
                return new Promise((resolve) => {
                  DriverMembershipModel.find({ driverId: u._id }).then(response => {


                    var membershipDates = [];
                    var membershipDays = []
                    if (response.length > 0) {

                      response.map(e => {
                        membershipDays.push(calculateDays(new Date, e.endDate))
                        // membershipDates.push(e.endDate)
                      });

                    }

                    var totalDays = 0
                   var maxDate = null
                    if (membershipDays.length > 0) {

                      membershipDays.map(day => {

                        if (day > 0) {
                          totalDays += day
                        }

                      })

                      var maxDate = moment().add(totalDays, "days").format('MMMM Do YYYY')
                    } else {

                      maxDate = null
                    }
                    data.membership = (maxDate != null ? maxDate + '</br>':'')              
                    data.membership += (maxDate == null ? ('<span class="badge badge-secondary">Not Purchased</span>') :(totalDays > 0 ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-danger">Expired</span>'));
                    data.full_name = u.fullName;
                    data.full_mobile = u.fullMobile;
                    data.email = u.email;
                    data.gender = u.gender;
                    data.avatar = u.avatar;
                    data.referral_code = u.referralCode;
                    data.referred_by = u.referredBy;
                    data.email_verified = (+u.isEmailVerified == 1 ? '<span class="badge badge-primary">Verified</span>' : '<span class="badge badge-secondary">Not Verify</span>');
                    data.mobile_verified = (+u.isMobileVerified == 1 ? '<span class="badge badge-primary">Verified</span>' : '<span class="badge badge-secondary">Not Verify</span>');
                    data.online = (+u.userOnline == '1' ? '<span class="badge badge-success">Online</span>' : '<span class="badge badge-danger">Offline</span>')
                    if (+u.userStatus == CONFIGS.userStatus.active) {
                      data.user_status = '<span class="badge badge-primary">Active</span>';
                    } else if (+u.userStatus == CONFIGS.userStatus.inactive) {
                      data.user_status = '<span class="badge badge-secondary">Inactive</span>';
                    } else if (+u.userStatus == CONFIGS.userStatus.suspended) {
                      data.user_status = '<span class="badge badge-secondary">Suspend</span>';
                    } else if (+u.userStatus == CONFIGS.userStatus.reported) {
                      data.user_status = '<span class="badge badge-warning">Reported</span>';
                    } else if (+u.userStatus == CONFIGS.userStatus.blocked) {
                      data.user_status = '<span class="badge badge-dark">Blocked</span>';
                    } else if (+u.userStatus == CONFIGS.userStatus.approved) {
                      data.user_status = '<span class="badge badge-primary">Approved</span>';
                    } else if (+u.userStatus == CONFIGS.userStatus.unapproved) {
                      data.user_status = '<span class="badge badge-successbadge-secondary">Unapproved</span>';
                    }
                    data.created = moment(u.createdAt).format('MMMM Do YYYY');
                    // data.membership = (+u.userOnline == '1' ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-danger">Expired</span>')
                    //  data.membership +=  '</br><button class="btn btn-primary btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="1">View</button>';

                    data.action = '<a class="btn btn-info btn-xs" href="/admin/driver/update/' + u.id + '"><i class="fas fa-pencil-alt"></i> Edit</a>';
                    data.action += (+u.userStatus == 1 ? '<button class="btn btn-danger btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="2">Inactive</button>' : '<button class="btn btn-primary btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');



                    return new Promise(() => {
                      //console.log("data",data)

                      //console.log(data)
                      dtData.push(data)
                      resolve()

                    })
                  })
                })
              })

            ).then(() => {

              let jsonData = JSON.stringify({
                "draw": req.body.draw,
                "recordsFiltered": recordsFiltered,
                "recordsTotal": recordsTotal,
                "data": dtData
              });
              res.send(jsonData);
            })

          }
        }).then(function (userDetail) {

        });


      });
    });





    // UserModel.find().then((data) => {
    //   Promise.all(
    //     data.map(u => {
    //       var data ={}
    //       return new Promise((resolve) => {
    //         DriverMembershipModel.find({ driverId: u._id }).then(response => {

    //           data.member = response
    //           data.full_name = u.fullName;

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
    //               data.user_status = '<span class="badge badge-primary">Active</span>';
    //             } else if (+u.userStatus == CONFIGS.userStatus.inactive) {
    //               data.user_status = '<span class="badge badge-secondary">Inactive</span>';
    //             } else if (+u.userStatus == CONFIGS.userStatus.suspended) {
    //               data.user_status = '<span class="badge badge-secondary">Suspend</span>';
    //             } else if (+u.userStatus == CONFIGS.userStatus.reported) {
    //               data.user_status = '<span class="badge badge-warning">Reported</span>';
    //             } else if (+u.userStatus == CONFIGS.userStatus.blocked) {
    //               data.user_status = '<span class="badge badge-dark">Blocked</span>';
    //             } else if (+u.userStatus == CONFIGS.userStatus.approved) {
    //               data.user_status = '<span class="badge badge-primary">Approved</span>';
    //             } else if (+u.userStatus == CONFIGS.userStatus.unapproved) {
    //               data.user_status = '<span class="badge badge-successbadge-secondary">Unapproved</span>';
    //             }
    //             data.created = moment(u.createdAt).format('MMMM Do YYYY');
    //             data.membership = (+u.userOnline == '1' ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-danger">Expired</span>')
    //             //  data.membership +=  '</br><button class="btn btn-primary btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="1">View</button>';

    //             data.action = '<a class="btn btn-info btn-xs" href="/admin/driver/update/' + u.id + '"><i class="fas fa-pencil-alt"></i> Edit</a>';
    //             data.action += (+u.userStatus == 1 ? '<button class="btn btn-danger btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="2">Inactive</button>' : '<button class="btn btn-primary btn-xs"  id="update-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');


    //           return new Promise(() => {
    //               //console.log("data",data)

    //             //console.log(data)
    //             ids.push(data)
    //                   resolve()

    //             })
    //           })
    //       })
    //     })

    //   ).then(() => {
    //     console.log("test",ids);
    //   })
    //   console.log("here")
    // })





  },


>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
  driverListDownload: function (req, res, next) {
    let { fromDate, endDate, statusId } = req.query;
    let queryOb = {};

    // query builder : sort by status
    if (+statusId) { queryOb.userStatus = statusId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }
    // query builder : role driver
    // queryOb.userRole = '2';

    UserModel.find(queryOb).select({ firstName: 1, mobile: 1, email: 1 }).exec(function (err, results) {
      let fields = ['firstName', 'mobile', 'email'];
      let opts = { fields };
      let csv = parse(results, opts);
      res.setHeader('Content-disposition', 'attachment; filename=drivers.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
    });
  },

  view: function (req, res, next) {
    res.render('pages/driver/driver-view', {
      pageTitle: 'Rumble | Driver'
    });
  },

  add: function (req, res, next) {
    console.log("req")
    let responseData = { pageTitle: 'Rumble | Dashboard' };
    responseData.error = req.flash('error');
    responseData.message = req.flash('success');

    responseData.reqBody = {};
    if (req.app.locals.reqBody != undefined) {
      responseData.reqBody = req.app.locals.reqBody;
      req.app.locals.reqBody = null;
    }

    VehicleBrandModel.find({ activeStatus: '1' }, (err, brand) => {
      if (err) {
        responseData.error = err;
        return res.render('pages/driver/driver-add', responseData);
      } else {
        responseData.brand = brand;
        VehicleModelModel.find({ activeStatus: '1' }, (err, model) => {
          if (err) {
            responseData.error = err;
            return res.render('pages/driver/driver-add', responseData);
          } else {
            responseData.model = model;
            VehicleTypeModel.find({ activeStatus: '1' }, (err, type) => {
              if (err) {
                responseData.error = err;
                return res.render('pages/driver/driver-add', responseData);
              } else {
                responseData.type = type;
                return res.render('pages/driver/driver-add', responseData);
              }
            });
          }
        });
      }
    });
  },

  BrandModel: function (req, res, next) {
<<<<<<< HEAD
   
=======

>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    // if (req.app.locals.reqBody != undefined) {
    //   responseData.reqBody = req.app.locals.reqBody;
    //   req.app.locals.reqBody = null;
    // }
    responseData = {}
    VehicleModelModel.find({ activeStatus: '1', vehicleBrandId: req.body.id }, (err, model) => {
      if (err) {

        console.log("err", err)
        res.send(responseData)
      } else {
        responseData.model = model

        VehicleTypeModel.find({ activeStatus: '1', vehicleBrandId: req.body.id }, (err, type) => {
          if (err) {
            console.log("err1", err)
            res.send(responseData)
          } else {
            responseData.type = type
            res.send(responseData)
          }
        });
      }
    });

  },

  addPost: function (req, res, next) {
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      req.flash('error', validationError);
      req.app.locals.reqBody = req.body;
      res.redirect('/admin/driver/add');
    } else {
      // check already registered
      UserModel.findOne({ $or: [{ mobile: req.body.mobile }, { email: req.body.email }] })
        .then((result) => {
          if (result) {
            req.flash('error', 'Already registered with same number or email.');
            req.app.locals.reqBody = req.body;
            res.redirect('/admin/driver/add');
          }
          else {
            // generate hash
            bcrypt.genSalt(10, (err, salt) => {
              if (err) {
                req.flash('error', err);
                res.redirect('/admin/driver/add');
              } else {
                bcrypt.hash(req.body.mobile, salt, (err, hash) => {
                  if (err) {
                    req.flash('error', err);
                    res.redirect('/admin/driver/add');
                  } else {
                    // save data in db
                    UserModel.create({
                      firstName: req.body.firstName,
                      lastName: req.body.lastName,
                      countryCode: req.body.countryCode,
                      mobile: req.body.mobile,
                      email: req.body.email,
                      avatar: req.body.profile,
                      gender: req.body.gender,
                      password: hash,
                      // referredBy: req.body,referral,
                      referralCode: req.body.firstName.substring(0, 3) + moment().toDate().getTime(),
                      verifiyEmailToken: randomstring.generate({ length: 12, charset: 'alphanumeric' }),
                      verifiyMobileOtp: randomstring.generate({ length: 4, charset: 'numeric' }),
                      expTime: new moment().add(10, 'minutes').toDate(),
                      acceptTNC: req.body.acceptTNC,
                      userRole: '2',
                    }, (err, result) => {
                      if (err) {
                        if (err.name == 'ValidationError') {
                          req.flash('error', err.errors);
                          req.app.locals.reqBody = req.body;
                          res.redirect('/admin/driver/add');
                        } else {
                          req.flash('error', err.errors);
                          res.redirect('/admin/driver/add');
                        }
                      } else {
                        // save data in db
                        DriverMetaModel.create({
                          driverId: result._id,
                          aadharFront: req.body.aadharFront,
                          aadharBack: req.body.aadharBack,
                          aadharNumber: req.body.aadharNumber,
                          dlFront: req.body.dlFront,
                          dlBack: req.body.dlBack,
                          motorIns: req.body.motorIns,
                          carriagePermit: req.body.carriagePermit,
                          policeVerifyPermit: req.body.policeVerifyPermit,
                        }, (err, resultMeta) => {
                          if (err) {
                            if (err.name == 'ValidationError') {
                              req.flash('error', err.errors);
                              req.app.locals.reqBody = req.body;
                              res.redirect('/admin/driver/add');
                            } else {
                              req.flash('error', err.errors);
                              res.redirect('/admin/driver/add');
                            }
                          } else {
                            // save data in db
                            VehicleModel.create({
                              driverId: result._id,
                              vehicleBrandId: req.body.brand,
                              vehicleModelId: req.body.model,
                              vehicleTypeId: req.body.type,
                              vehicleNumber: req.body.vechileNumber,
                              vehicleYear: req.body.vechileYear,
                              vehicleColor: req.body.vechileColor,
                              vehicleCapacity: req.body.vechileCapacity,
                              activeStatus: '1',
                            }, (err, resultVechile) => {
                              if (err) {
                                if (err.name == 'ValidationError') {
                                  req.flash('error', err.errors);
                                  req.app.locals.reqBody = req.body;
                                  res.redirect('/admin/driver/add');
                                } else {
                                  req.flash('error', err.errors);
                                  res.redirect('/admin/driver/add');
                                }
                              } else {
                                req.flash('success', 'Registered Successfully !');
                                res.redirect('/admin/driver/add');
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        })
    }
  },

  update: function (req, res, next) {
    let { id } = req.params;
    let responseData = { pageTitle: 'Rumble | Driver', error: '', driverData: {}, driverMetaData: {}, driverVechileData: {} };
    responseData.error = req.flash('error');
    responseData.message = req.flash('success');

    responseData.reqBody = {};
    if (req.app.locals.reqBody != undefined) {
      responseData.reqBody = req.app.locals.reqBody;
      req.app.locals.reqBody = null;
    }

    VehicleBrandModel.find({ activeStatus: '1' }, (err, brand) => {
      if (err) {
        responseData.error = err;
        return res.render('pages/driver/driver-update', responseData);
      } else {
        responseData.brand = brand;
        VehicleModelModel.find({ activeStatus: '1' }, (err, model) => {
          if (err) {
            responseData.error = err;
            return res.render('pages/driver/driver-update', responseData);
          } else {
            responseData.model = model;
            VehicleTypeModel.find({ activeStatus: '1' }, (err, type) => {
              if (err) {
                responseData.error = err;
                return res.render('pages/driver/driver-update', responseData);
              } else {
                responseData.type = type;
                // get data
                UserModel.findOne({ _id: id })
                  .then((result) => {
                    if (result) {
                      responseData.driverData = result;
                      DriverMetaModel.findOne({ driverId: id })
                        .then((resultMeta) => {
                          if (resultMeta) {
                            responseData.driverMetaData = resultMeta;
                            VehicleModel.findOne({ driverId: id })
                              .then((resultVechile) => {
                                if (resultVechile) {
                                  responseData.driverVechileData = resultVechile;
                                  return res.render('pages/driver/driver-update', responseData);
                                } else {
                                  responseData.error = 'Something Went Wrong.';
                                  return res.render('pages/driver/driver-update', responseData);
                                }
                              });
                          } else {
                            responseData.error = 'Something Went Wrong.';
                            return res.render('pages/driver/driver-update', responseData);
                          }
                        });
                    } else {
                      responseData.error = 'Something Went Wrong.';
                      return res.render('pages/driver/driver-update', responseData);
                    }
                  });
              }
            });
          }
        });
      }
    });
  },

  updatePost: function (req, res, next) {
    let { id } = req.params;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      req.flash('error', validationError);
      req.app.locals.reqBody = req.body;
      res.redirect('/admin/driver/update/' + id);
    } else {
      // check already registered
      UserModel.findOne({ $or: [{ mobile: req.body.mobile }, { email: req.body.email }], _id: { $ne: id } })
        .then((result) => {
          if (result) {
            req.flash('error', 'Already registered with same number or email.');
            req.app.locals.reqBody = req.body;
            res.redirect('/admin/driver/update/' + id);
          }
          else {
            // save data in db
            UserModel.updateOne({ _id: id, userRole: '' + global.CONFIGS.role.driver }, {
              $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                countryCode: req.body.countryCode,
                mobile: req.body.mobile,
                email: req.body.email,
                avatar: req.body.profile,
                gender: req.body.gender,
                referralCode: req.body.firstName.substring(0, 3) + moment().toDate().getTime(),
              }
            }, (err, result) => {
              if (err) {
                if (err.name == 'ValidationError') {
                  req.flash('error', err.errors);
                  req.app.locals.reqBody = req.body;
                  res.redirect('/admin/driver/update/' + id);
                } else {
                  req.flash('error', err.errors);
                  res.redirect('/admin/driver/update/' + id);
                }
              } else {
                // save data in db
                driverMetaData = { aadharNumber: req.body.aadharNumber };
                if (req.body.aadharFront) { driverMetaData.aadharFront = req.body.aadharFront; }
                if (req.body.aadharBack) { driverMetaData.aadharBack = req.body.aadharBack; }
                if (req.body.dlFront) { driverMetaData.dlFront = req.body.dlFront; }
                if (req.body.dlBack) { driverMetaData.dlBack = req.body.dlBack; }
                if (req.body.motorIns) { driverMetaData.motorIns = req.body.motorIns; }
                if (req.body.carriagePermit) { driverMetaData.carriagePermit = req.body.carriagePermit; }
                if (req.body.policeVerifyPermit) { driverMetaData.policeVerifyPermit = req.body.policeVerifyPermit; }
                DriverMetaModel.updateOne({ driverId: id }, {
                  $set: driverMetaData
                }, (err, resultMeta) => {
                  if (err) {
                    if (err.name == 'ValidationError') {
                      req.flash('error', err.errors);
                      req.app.locals.reqBody = req.body;
                      res.redirect('/admin/driver/update/' + id);
                    } else {
                      req.flash('error', err.errors);
                      res.redirect('/admin/driver/update/' + id);
                    }
                  } else {
                    // save data in db
                    VehicleModel.updateOne({ driverId: id }, {
                      $set: {
                        vehicleBrandId: req.body.brand,
                        vehicleModelId: req.body.model,
                        vehicleTypeId: req.body.type,
                        vehicleNumber: req.body.vechileNumber,
                        vehicleYear: req.body.vechileYear,
                        vehicleColor: req.body.vechileColor,
                        vehicleCapacity: req.body.vechileCapacity,
                      }
                    }, (err, resultVechile) => {
                      if (err) {
                        if (err.name == 'ValidationError') {
                          req.flash('error', err.errors);
                          req.app.locals.reqBody = req.body;
                          res.redirect('/admin/driver/update/' + id);
                        } else {
                          req.flash('error', err.errors);
                          res.redirect('/admin/driver/update/' + id);
                        }
                      } else {
                        req.flash('success', 'Updated Successfully !');
                        res.redirect('/admin/driver/update/' + id);
                      }
                    });
                  }
                });
              }
            });
          }
        })
    }
  },


  updateuserStatus: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { id, status } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check type


      UserModel.findOne({ _id: id }).then((result) => {
        if (result) {
          // update data in db
          UserModel.updateOne({ _id: id }, {
            $set: {
              userStatus: '' + status,
            }
          }, (err, result) => {
            if (err) {
              if (err.name == 'ValidationError') {
                responseData.msg = err.errors;
                res.status(responseData.status).send(responseData);
              } else {
                responseData.msg = 'Something Went Wrong.';
                res.status(responseData.status).send(responseData);
              }
            } else {
              responseData.status = 200;
              responseData.msg = "Updated Successfully !";
              res.status(responseData.status).send(responseData);
            }
          })
        } else {
          responseData.msg = 'Record Not Found.';
          res.status(responseData.status).send(responseData);
        }
      })
    }
  },

};

<<<<<<< HEAD
=======


function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
module.exports = driverFunctions;