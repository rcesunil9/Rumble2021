var mongoose = require('mongoose');
var moment = require('moment');
const { parse } = require('json2csv');

var globalServices = require('../services/globalService');

var constants = require('../models/modelConstants');
var CouponModel = mongoose.model(constants.CouponModel);

let couponMasterFunctions = {

  view: function (req, res, next) {
    res.render('component/coupon-master', {
      pageTitle: 'Rumble | Coupon Master'
    });
  },

  listAjax: function (req, res, next) {
<<<<<<< HEAD
    let { fromDate, endDate, statusId, start, length } = req.body;
=======
    let { fromDate, endDate, countryId, start, length } = req.body;
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

    // query builder : sort
    let columns = ['', '', 'couponCode', 'discountValue', 'discountType', 'activeStatus', 'createdAt'];
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
        { couponCode: { $regex: new RegExp(searchText), $options: 'i' } },
        { discountType: { $regex: new RegExp(searchText), $options: 'i' } }
      ];
      if (+req.body['search[value]']) {
        queryOb.$or.push({ discountValue: +req.body['search[value]'] });
      }
    }
    // query builder : sort by status
<<<<<<< HEAD
    if (+statusId) { queryOb.userStatus = statusId; }
=======
    if (countryId != "")  { queryOb.country = countryId; }
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }

    CouponModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      CouponModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // coupon
        CouponModel.find(queryOb).select({ couponCode: 1, discountValue: 1, discountType: 1, activeStatus: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).then((couponDetail) => {
          if (couponDetail) {
            let ind = 1;
            couponDetail.forEach(function (u) {
              let data = {};
              data.sr_no = ind;
              data.action = '';
              if (+u.activeStatus != 2) {
                data.action += '<button class="btn btn-info btn-xs" id="addupdate-coupon" href="#" data-id="' + u._id + '"><i class="fas fa-pencil-alt"></i> Edit</button>';
                data.action += (+u.activeStatus == 1 ? '<button class="btn btn-danger btn-xs" id="update-status" href="#" data-id="' + u._id + '" data-status="0">Inactive</button>' : '<button class="btn btn-primary btn-xs" id="update-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');
                data.action += '<button class="btn btn-warning btn-xs" id="update-status" href="#" data-id="' + u._id + '" data-status="2"><i class="fas fa-trash"></i> Delete</button>';
              }
              data.code = u.couponCode;
              data.type = u.discountType;
              data.value_percentage = u.discountValue;
              data.status = (+u.activeStatus == 2 ? '<span class="badge badge-danger">Deleted</span>' : (+u.activeStatus == 1 ? '<span class="badge badge-primary">Active</span>' : '<span class="badge badge-secondary">Inactive</span>'));
              data.created = moment(u.createdAt).format('MMMM Do YYYY');
              dtData.push(data);
              ind++;
            });
          }
          return Promise.all(dtData);
        }).then(function (dtData) {
          // send data to view
          let jsonData = JSON.stringify({
            "draw": req.body.draw,
            "recordsFiltered": recordsFiltered,
            "recordsTotal": recordsTotal,
            "data": dtData,
            
          });
          res.send(jsonData);
        });
      });
    });
  },

  addPost: function (req, res, next) {
<<<<<<< HEAD
=======
    console.log("req",req.body)
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    let responseData = { status: 400, msg: "Something Went Wrong", field: "code" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check already registered
      CouponModel.findOne({ couponCode: req.body.code })
        .then((result) => {
          if (result) {
            responseData.msg = 'Already, coupon code has registered.';
            res.status(responseData.status).send(responseData);
          }
          else {
            // save data in db
            CouponModel.create({
<<<<<<< HEAD
=======
              country:req.body.country,
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
              couponCode: req.body.code,
              discountValue: req.body.value,
              discountType: req.body.type,
              activeStatus: '1'
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
                responseData.msg = "Added Successfully !";
                res.status(responseData.status).send(responseData);
              }
            });
          }
        })
    }
  },

  getCouponById: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // get data
      CouponModel.findOne({ _id: id })
        .then((result) => {
          if (result) {
<<<<<<< HEAD
=======
            console.log("result",result)
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
            responseData.coupon = result;
            responseData.status = 200;
            responseData.msg = "Success !";
            res.status(responseData.status).send(responseData);
          } else {
            responseData.msg = 'Something Went Wrong.';
            res.status(responseData.status).send(responseData);
          }
        });
    }
  },

  updateCouponPost: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong", field: "code" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check already registered
      CouponModel.findOne({ couponCode: req.body.code, _id: { $ne: id } })
        .then((result) => {
          if (result) {
            responseData.msg = 'Already, coupon code has registered.';
            res.status(responseData.status).send(responseData);
          }
          else {
            // save data in db
            CouponModel.updateOne({ _id: id }, {
              $set: {
<<<<<<< HEAD
=======
                country:req.body.country,
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
                couponCode: req.body.code,
                discountValue: req.body.value,
                discountType: req.body.type,
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
            });
          }
        })
    }
  },

  updateCouponStatus: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { id, status, type } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check type
      CouponModel.findOne({ _id: id }).then((result) => {
        if (result) {
          // update data in db
          CouponModel.updateOne({ _id: id }, {
            $set: {
              activeStatus: '' + status,
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

module.exports = couponMasterFunctions;