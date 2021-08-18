var mongoose = require('mongoose');
var moment = require('moment');
const { parse } = require('json2csv');

var globalServices = require('../services/globalService');
var constants = require('../models/modelConstants');
var BookingRatingModel = mongoose.model(constants.BookingRatingModel);
<<<<<<< HEAD
//var DriverRatingModel = mongoose.model(constants.DriverRatingModel);
=======
var DriverRatingModel = mongoose.model(constants.DriverRatingModel);
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1



var StktDriverModel = mongoose.model(constants.StktDriverModel);
var RatingOptionModel = mongoose.model(constants.RatingOptionModel);

let ratingReviewFunctions = {

  viewSCustomer: function (req, res, next) {
    res.render('pages/rating-review/customer-review', {
      pageTitle: 'Rumble | Customer Reviews'
    });
  },

  listAjaxRCustomer: function (req, res, next) {
    
    let { fromDate, endDate, statusId, start, length } = req.body;
    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

    // query builder : sort
    let columns = ['', '', 'cMobile', 'cEmail', 'ratingStar','rateDesc','createdAt'];
    $column = 'createdAt';
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
        { rateDesc: { $regex: new RegExp(searchText), $options: 'i' } },
        { cEmail: { $regex: new RegExp(searchText), $options: 'i' } },
      ];
      if (+req.body['search[value]']) {
        queryOb.$or.push({ cMobile: +req.body['search[value]'] });
      }
    }
    
    console.log("query",queryOb)
    // query builder : sort by star
    if (statusId && +statusId >= 0) { queryOb.ratingStar = statusId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }

    BookingRatingModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      BookingRatingModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // ticket
       // StktCustomerModel.find(queryOb).select({ tktDesc: 1, tktStatus: 1, replies: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: 'replies.userId', model: constants.UserModel, select: { firstName: 1, lastName: 1, fullName: 1 } }).then((bookingRatings) => {
         
        BookingRatingModel.find(queryOb).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate('rateDescOption').populate({ path: 'driverId', model: constants.UserModel, select: { firstName: 1, lastName: 1 } }).populate({ path: 'customerId', model: constants.UserModel, select: { firstName: 1, lastName: 1 ,mobile:1,email:1} }).then((bookingRatings) => {

          if (bookingRatings) {
            let ind = 1;
            bookingRatings.forEach(function (u) {

              console.log("review", u);

               let data = {};
               data.sr_no = ind;
             
              data.cName = u.customerId.fullName;
              data.dName = u.driverId.fullName;
              data.cMobile = u.customerId.fullMobile;
              data.cEmail = u.customerId.email;
              data.cStar = u.ratingStar;
              data.cRateDesc = u.rateDesc;
              data.created = moment(u.createdAt).format('MMMM Do YYYY - hh:MM A');

               dtData.push(data);
               ind++;
            });
          }
          console.log("allData",dtData)
          return Promise.all(dtData);
        }).then(function (dtData) {
          // send data to view
          let jsonData = JSON.stringify({
            "draw": req.body.draw,
            "recordsFiltered": recordsFiltered,
            "recordsTotal": recordsTotal,
            "data": dtData
          });
          console.log("jsondata",jsonData)
          res.send(jsonData);
        }).catch((err) => {
          console.log(err);
        })
      });
    });
  },

  // replyPostSCustomer: function (req, res, next) {
  //   let responseData = { status: 400, msg: "Something Went Wrong", field: "desc" };
  //   let { id, desc } = req.body;
  //   let { validationError } = req;

  //   // validate request
  //   if (validationError != undefined && validationError) {
  //     responseData.msg = validationError;
  //     res.status(responseData.status).send(responseData);
  //   } else {
  //     // check already registered
  //     StktCustomerModel.findOne({ _id: id })
  //       .then((result) => {
  //         if (result) {
  //           // save data in db
  //           result.replies = [];
  //           result.replies.push({ userId: req.user._id, replyDesc: desc });
  //           return result.save()
  //             .then((resultSave) => {
  //               if (resultSave) {
  //                 responseData.status = 200;
  //                 responseData.msg = "Added Successfully !";
  //                 res.status(responseData.status).send(responseData);
  //               } else {
  //                 res.status(responseData.status).send(responseData);
  //               }
  //             }).catch((err) => {
  //               console.log(err);
  //             })
  //         } else {
  //           responseData.msg = 'Record Not Found.';
  //           res.status(responseData.status).send(responseData);
  //         }
  //       }).catch((err) => {
  //         console.log(err);
  //       })
  //   }
  // },

  // updateStatusSCustomer: function (req, res, next) {
  //   let responseData = { status: 400, msg: "Something Went Wrong" };
  //   let { id, status } = req.body;
  //   let { validationError } = req;

  //   // validate request
  //   if (validationError != undefined && validationError) {
  //     responseData.msg = validationError;
  //     res.status(responseData.status).send(responseData);
  //   } else {
  //     // check type
  //     StktCustomerModel.findOne({ _id: id }).then((result) => {
  //       if (result) {
  //         if (+result.tktStatus == 1 && +status == 2 && !result.replies.length) {
  //           responseData.msg = "Please Submit Reply !";
  //           res.status(responseData.status).send(responseData);
  //         } else {
  //           // update data in db
  //           StktCustomerModel.updateOne({ _id: id }, {
  //             $set: {
  //               tktStatus: '' + status,
  //             }
  //           }, (err, result) => {
  //             if (err) {
  //               if (err.name == 'ValidationError') {
  //                 responseData.msg = err.errors;
  //                 res.status(responseData.status).send(responseData);
  //               } else {
  //                 responseData.msg = 'Something Went Wrong.';
  //                 res.status(responseData.status).send(responseData);
  //               }
  //             } else {
  //               responseData.status = 200;
  //               responseData.msg = "Updated Successfully !";
  //               res.status(responseData.status).send(responseData);
  //             }
  //           })
  //         }
  //       } else {
  //         responseData.msg = 'Record Not Found.';
  //         res.status(responseData.status).send(responseData);
  //       }
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   }
  // },

  viewSDriver: function (req, res, next) {
    res.render('pages/rating-review/driver-review', {
      pageTitle: 'Rumble | Driver Ratings'
    });
  },

  listAjaxSDriver: function (req, res, next) {
    console.log("requestDriver",req.body)
    let { fromDate, endDate, statusId, start, length } = req.body;
    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

    // query builder : sort
    let columns = ['', '', '', 'email', 'ratingStar', 'createdAt'];
    $column = 'createdAt';
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
        { 'email': { $regex: new RegExp(searchText), $options: 'i' } }
      ];
    }
    // query builder : sort by status
    if (statusId && +statusId >= 0) { queryOb.ratingStar = statusId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }

 
<<<<<<< HEAD


    // DriverRatingModel.count({}, function (err, c) {
    //   if (c == undefined) { c = 0; }
    //   recordsTotal = c;
    //   DriverRatingModel.count(queryOb, function (err, c) {
    //     if (c == undefined) { c = 0; }
    //     recordsFiltered = c;
    //     // ticket
    //     // StktCustomerModel.find(queryOb).select({ tktDesc: 1, tktStatus: 1, replies: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: 'replies.userId', model: constants.UserModel, select: { firstName: 1, lastName: 1, fullName: 1 } }).then((bookingRatings) => {


    //     console.log("sortob", sortOb)
    //     console.log("queryob", queryOb)
    //     DriverRatingModel.find(queryOb).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: 'driverId', model: constants.UserModel, select: { firstName: 1, lastName: 1 } }).populate({ path: 'customerId', model: constants.UserModel, select: { firstName: 1, lastName: 1, mobile: 1, email: 1 } }).then((driverRating) => {
=======
    DriverRatingModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      DriverRatingModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // ticket
        // StktCustomerModel.find(queryOb).select({ tktDesc: 1, tktStatus: 1, replies: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: 'replies.userId', model: constants.UserModel, select: { firstName: 1, lastName: 1, fullName: 1 } }).then((bookingRatings) => {


        console.log("sortob", sortOb)
        console.log("queryob", queryOb)
        DriverRatingModel.find(queryOb).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: 'driverId', model: constants.UserModel, select: { firstName: 1, lastName: 1 } }).populate({ path: 'customerId', model: constants.UserModel, select: { firstName: 1, lastName: 1, mobile: 1, email: 1 } }).then((driverRating) => {
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1


     

<<<<<<< HEAD
    //       if (driverRating) {

    //         console.log("driver Review", driverRating);
    //         let ind = 1;
    //         driverRating.forEach(function (u) {


    //           let data = {};
    //           data.sr_no = ind;

    //           data.cName = u.customerId.fullName;
    //           data.dName = u.driverId.fullName;
    //           data.cMobile = u.customerId.fullMobile;
    //           data.cEmail = u.customerId.email;
    //           data.cStar = u.ratingStar;
            
    //           data.created = moment(u.createdAt).format('MMMM Do YYYY - hh:MM A');

    //           dtData.push(data);
    //           ind++;
    //         });
    //       }
    //       console.log("allData", dtData)
    //       return Promise.all(dtData);
    //     }).then(function (dtData) {
    //       // send data to view
    //       let jsonData = JSON.stringify({
    //         "draw": req.body.draw,
    //         "recordsFiltered": recordsFiltered,
    //         "recordsTotal": recordsTotal,
    //         "data": dtData
    //       });
    //       console.log("jsondata", jsonData)
    //       res.send(jsonData);
    //     }).catch((err) => {
    //       console.log(err);
    //     })
    //   });
    // });
=======
          if (driverRating) {

            console.log("driver Review", driverRating);
            let ind = 1;
            driverRating.forEach(function (u) {


              let data = {};
              data.sr_no = ind;

              data.cName = u.customerId.fullName;
              data.dName = u.driverId.fullName;
              data.cMobile = u.customerId.fullMobile;
              data.cEmail = u.customerId.email;
              data.cStar = u.ratingStar;
            
              data.created = moment(u.createdAt).format('MMMM Do YYYY - hh:MM A');

              dtData.push(data);
              ind++;
            });
          }
          console.log("allData", dtData)
          return Promise.all(dtData);
        }).then(function (dtData) {
          // send data to view
          let jsonData = JSON.stringify({
            "draw": req.body.draw,
            "recordsFiltered": recordsFiltered,
            "recordsTotal": recordsTotal,
            "data": dtData
          });
          console.log("jsondata", jsonData)
          res.send(jsonData);
        }).catch((err) => {
          console.log(err);
        })
      });
    });
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
  },

  // replyPostSDriver: function (req, res, next) {
  //   let responseData = { status: 400, msg: "Something Went Wrong", field: "desc" };
  //   let { id, desc } = req.body;
  //   let { validationError } = req;

  //   // validate request
  //   if (validationError != undefined && validationError) {
  //     responseData.msg = validationError;
  //     res.status(responseData.status).send(responseData);
  //   } else {
  //     // check already registered
  //     StktDriverModel.findOne({ _id: id })
  //       .then((result) => {
  //         if (result) {
  //           // save data in db
  //           result.replies = [];
  //           result.replies.push({ userId: req.user._id, replyDesc: desc });
  //           return result.save()
  //             .then((resultSave) => {
  //               if (resultSave) {
  //                 responseData.status = 200;
  //                 responseData.msg = "Added Successfully !";
  //                 res.status(responseData.status).send(responseData);
  //               } else {
  //                 res.status(responseData.status).send(responseData);
  //               }
  //             }).catch((err) => {
  //               console.log(err);
  //             })
  //         } else {
  //           responseData.msg = 'Record Not Found.';
  //           res.status(responseData.status).send(responseData);
  //         }
  //       }).catch((err) => {
  //         console.log(err);
  //       })
  //   }
  // },

  // updateStatusSDriver: function (req, res, next) {
  //   let responseData = { status: 400, msg: "Something Went Wrong" };
  //   let { id, status } = req.body;
  //   let { validationError } = req;

  //   // validate request
  //   if (validationError != undefined && validationError) {
  //     responseData.msg = validationError;
  //     res.status(responseData.status).send(responseData);
  //   } else {
  //     // check type
  //     StktDriverModel.findOne({ _id: id }).then((result) => {
  //       if (result) {
  //         if (+result.tktStatus == 1 && +status == 2 && !result.replies.length) {
  //           responseData.msg = "Please Submit Reply !";
  //           res.status(responseData.status).send(responseData);
  //         } else {
  //           // update data in db
  //           StktDriverModel.updateOne({ _id: id }, {
  //             $set: {
  //               tktStatus: '' + status,
  //             }
  //           }, (err, result) => {
  //             if (err) {
  //               if (err.name == 'ValidationError') {
  //                 responseData.msg = err.errors;
  //                 res.status(responseData.status).send(responseData);
  //               } else {
  //                 responseData.msg = 'Something Went Wrong.';
  //                 res.status(responseData.status).send(responseData);
  //               }
  //             } else {
  //               responseData.status = 200;
  //               responseData.msg = "Updated Successfully !";
  //               res.status(responseData.status).send(responseData);
  //             }
  //           })
  //         }
  //       } else {
  //         responseData.msg = 'Record Not Found.';
  //         res.status(responseData.status).send(responseData);
  //       }
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   }
  // },

};

module.exports = ratingReviewFunctions;