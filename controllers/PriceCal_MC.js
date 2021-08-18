var mongoose = require('mongoose');
var moment = require('moment');
const { parse } = require('json2csv');

var globalServices = require('../services/globalService');

var constants = require('../models/modelConstants');
var PriceCalculatorModel = mongoose.model(constants.PriceCalculatorModel);

let priceCalMasterFunctions = {

  view: function (req, res, next) {
    res.render('component/pricecal-master', {
      pageTitle: 'Rumble | Price Calculator Master'
    });
  },

  listAjax: function (req, res, next) {
    let { fromDate, endDate, statusId, start, length } = req.body;
    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

    // query builder : sort
    let columns = ['', '', 'baseFare', 'rideFarePerKm', 'minuteFare', 'convinienceFare', 'activeStatus', 'createdAt'];
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
      if (+req.body['search[value]']) {
        queryOb.$or = [];
        queryOb.$or.push({ baseFare: +req.body['search[value]'] });
        queryOb.$or.push({ baseFareUptoKm: +req.body['search[value]'] });
        queryOb.$or.push({ rideFarePerKm: +req.body['search[value]'] });
        queryOb.$or.push({ minuteFare: +req.body['search[value]'] });
        queryOb.$or.push({ convinienceFare: +req.body['search[value]'] });
      }
    }
    // query builder : sort by status
    if (+statusId) { queryOb.userStatus = statusId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }

    PriceCalculatorModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      PriceCalculatorModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // coupon
        PriceCalculatorModel.find(queryOb).select({ baseFare: 1, baseFareUptoKm: 1, rideFarePerKm: 1, minuteFare: 1, convinienceFare: 1, activeStatus: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).then((priceCalDetail) => {
          if (priceCalDetail) {
            let ind = 1;
            priceCalDetail.forEach(function (u) {
              let data = {};
              data.sr_no = ind;
              data.action = '';
              if (+u.activeStatus != 2) {
                data.action += '<button class="btn btn-info btn-xs" id="addupdate-pricecal" href="#" data-id="' + u._id + '"><i class="fas fa-pencil-alt"></i> Edit</button>';
                data.action += (+u.activeStatus == 1 ? '<button class="btn btn-danger btn-xs" id="update-status" href="#" data-id="' + u._id + '" data-status="0">Inactive</button>' : '<button class="btn btn-primary btn-xs" id="update-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');
                data.action += '<button class="btn btn-warning btn-xs" id="update-status" href="#" data-id="' + u._id + '" data-status="2"><i class="fas fa-trash"></i> Delete</button>';
              }
              data.base_fare = '<i class="fas fa-rupee-sign"></i> ' + u.baseFare + ' / upto ' + u.baseFareUptoKm + ' km';
              data.ride_fare = '<i class="fas fa-rupee-sign"></i> ' + u.rideFarePerKm + ' / km';
              data.minute_fare = '<i class="fas fa-rupee-sign"></i> ' + u.minuteFare + ' / min';
              data.convinience_fare = '<i class="fas fa-rupee-sign"></i> ' + u.convinienceFare;
              data.status = (+u.activeStatus == 1 ? '<span class="badge badge-primary">Active</span>' : '<span class="badge badge-secondary">Inactive</span>');
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
            "data": dtData
          });
          res.send(jsonData);
        })
      })
    });
  },

  addPost: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong", field: "basefare" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // save data in db
      PriceCalculatorModel.create({
        baseFare: req.body.basefare,
        baseFareUptoKm: req.body.basekm,
        rideFarePerKm: req.body.ridefare,
        minuteFare: req.body.minfare,
        convinienceFare: req.body.conviniencefare
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
  },

  getPriceCalById: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // get data
      PriceCalculatorModel.findOne({ _id: id })
        .then((result) => {
          if (result) {
            responseData.pricecal = result;
            responseData.status = 200;
            responseData.msg = "Success !";
            res.status(responseData.status).send(responseData);
          } else {
            responseData.error = 'Something Went Wrong.';
            res.status(responseData.status).send(responseData);
          }
        });
    }
  },

  updatePriceCalPost: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong", field: "type" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // update data in db
      PriceCalculatorModel.updateOne({ _id: id }, {
        $set: {
          baseFare: req.body.basefare,
          baseFareUptoKm: req.body.basekm,
          rideFarePerKm: req.body.ridefare,
          minuteFare: req.body.minfare,
          convinienceFare: req.body.conviniencefare
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
    }
  },

  updatePriceCalStatus: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { id, status } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // verify record
      PriceCalculatorModel.findOne({ _id: id }).then((result) => {
        if (result) {
          // update data in db
          PriceCalculatorModel.updateOne({ _id: id }, {
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
              // update status : other records
              if (+status) {
                PriceCalculatorModel.updateMany({ _id: { $ne: id }, activeStatus: { $ne: '2' } }, {
                  $set: {
                    activeStatus: '0',
                  }
                }, function (err, result) { });
              }
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

module.exports = priceCalMasterFunctions;