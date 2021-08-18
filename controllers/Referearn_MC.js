var mongoose = require('mongoose');
var moment = require('moment');
const { parse } = require('json2csv');

var globalServices = require('../services/globalService');

var constants = require('../models/modelConstants');
var EnRModel = mongoose.model(constants.EnRModel);

let membershipMasterFunctions = {

  view: function (req, res, next) {
    res.render('component/referearn-master', {
      pageTitle: 'Rumble | Refer&Earn Master'
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
    let columns = ['', '', 'referType', 'amount', 'afterCompleteFirstRide', 'dtcReferDurationInMonth', 'activeStatus', 'createdAt'];
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
        queryOb.$or.push({ amount: +req.body['search[value]'] });
        queryOb.$or.push({ dtcReferDurationInMonth: +req.body['search[value]'] });
      }
    }
    // query builder : sort by status
    if (+statusId) { queryOb.userStatus = statusId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }

    EnRModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      EnRModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // coupon
        EnRModel.find(queryOb).select({ referType: 1, amount: 1, afterCompleteFirstRide: 1, dtcReferDurationInMonth: 1, activeStatus: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).then((rneDetail) => {
          if (rneDetail) {
            let ind = 1;
            rneDetail.forEach(function (u) {
              let data = {};
              data.sr_no = ind;
              data.action = '';
              if (+u.activeStatus != 2) {
                data.action += '<button class="btn btn-info btn-xs" id="addupdate-rne" href="#" data-id="' + u._id + '"><i class="fas fa-pencil-alt"></i> Edit</button>';
                data.action += (+u.activeStatus == 1 ? '<button class="btn btn-danger btn-xs" id="update-status" href="#" data-id="' + u._id + '" data-status="0">Inactive</button>' : '<button class="btn btn-primary btn-xs" id="update-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');
                data.action += '<button class="btn btn-warning btn-xs" id="update-status" href="#" data-id="' + u._id + '" data-status="2"><i class="fas fa-trash"></i> Delete</button>';
              }
              data.type = global.CONFIGS.referTypeByStatus[u.referType];
              data.amount = u.amount;
              data.after_first_ride = (+u.afterCompleteFirstRide == 1 ? '<span class="badge badge-primary">Yes</span>' : '');
              data.dtc_duration_Month = (u.dtcReferDurationInMonth > 0 ? 'for ' + u.dtcReferDurationInMonth + ' months' : '');
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
        });
      });
    });
  },

  addPost: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong", field: "type" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check already registered
      EnRModel.findOne({ referType: req.body.type })
        .then((result) => {
          if (result) {
            responseData.field = 'type';
            responseData.msg = 'Already, refer type has registered.';
            res.status(responseData.status).send(responseData);
          }
          else {
            // save data in db
            EnRModel.create({
              referType: req.body.type,
              amount: req.body.amount,
              afterCompleteFirstRide: (+req.body.after_first_ride == 1 ? '1' : '0'),
              isDTCRefer: (global.CONFIGS.referTypeByName['DTC'] == req.body.type ? '1' : '0'),
              dtcReferDurationInMonth: (global.CONFIGS.referTypeByName['DTC'] == req.body.type ? req.body.dtc_duration_Month : 0),
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

  getEnRById: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // get data
      EnRModel.findOne({ _id: id })
        .then((result) => {
          if (result) {
            responseData.rne = result;
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

  updateEnRPost: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong", field: "type" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check already registered
      EnRModel.findOne({ referType: req.body.type, _id: { $ne: id } })
        .then((result) => {
          if (result) {
            responseData.field = 'type';
            responseData.msg = 'Already, refer type has registered.';
            res.status(responseData.status).send(responseData);
          }
          else {
            // save data in db
            EnRModel.updateOne({ _id: id }, {
              $set: {
                referType: req.body.type,
                amount: req.body.amount,
                afterCompleteFirstRide: (+req.body.after_first_ride == 1 ? '1' : '0'),
                isDTCRefer: (global.CONFIGS.referTypeByName['DTC'] == req.body.type ? '1' : '0'),
                dtcReferDurationInMonth: (global.CONFIGS.referTypeByName['DTC'] == req.body.type ? req.body.dtc_duration_Month : 0),
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

  updateEnRStatus: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { id, status } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // verify record
      EnRModel.findOne({ _id: id }).then((result) => {
        if (result) {
          // update data in db
          EnRModel.updateOne({ _id: id }, {
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

module.exports = membershipMasterFunctions;