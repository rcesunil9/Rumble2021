var mongoose = require('mongoose');
var moment = require('moment');
const { parse } = require('json2csv');

var globalServices = require('../services/globalService');

var constants = require('../models/modelConstants');
var RatingOptionModel = mongoose.model(constants.RatingOptionModel);

let ratingOptnMasterFunctions = {

  view: function (req, res, next) {
    res.render('component/ratingoptn-master', {
      pageTitle: 'Rumble | Rating Option Master'
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
    let columns = ['', '', 'ratingOptName', 'activeStatus', 'createdAt'];
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
        { ratingOptName: { $regex: new RegExp(searchText), $options: 'i' } }
      ];
    }
    // query builder : sort by status
    if (+statusId) { queryOb.userStatus = statusId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }

    RatingOptionModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      RatingOptionModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // coupon
        RatingOptionModel.find(queryOb).select({ ratingOptName: 1, activeStatus: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).then((ratingDetail) => {
          if (ratingDetail) {
            let ind = 1;
            ratingDetail.forEach(function (u) {
              let data = {};
              data.sr_no = ind;
              data.action = '';
              if (+u.activeStatus != 2) {
                data.action += '<button class="btn btn-info btn-xs" id="addupdate-ratingoptn" href="#" data-id="' + u._id + '"><i class="fas fa-pencil-alt"></i> Edit</button>';
                data.action += (+u.activeStatus == 1 ? '<button class="btn btn-danger btn-xs" id="update-status" href="#" data-id="' + u._id + '" data-status="0">Inactive</button>' : '<button class="btn btn-primary btn-xs" id="update-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');
                data.action += '<button class="btn btn-warning btn-xs" id="update-status" href="#" data-id="' + u._id + '" data-status="2"><i class="fas fa-trash"></i> Delete</button>';
              }
              data.name = u.ratingOptName;
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
            "data": dtData
          });
          res.send(jsonData);
        });
      });
    });
  },

  addPost: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong", field: "name" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // save data in db
      RatingOptionModel.create({
        ratingOptName: req.body.name,
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
  },

  getRatingOptnById: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // get data
      RatingOptionModel.findOne({ _id: id })
        .then((result) => {
          if (result) {
            responseData.ratingoptn = result;
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

  updateRatingOptnPost: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong", field: "type" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // update data in db
      RatingOptionModel.updateOne({ _id: id }, {
        $set: {
          ratingOptName: req.body.name
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

  updateRatingOptnStatus: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { id, status } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // verify record
      RatingOptionModel.findOne({ _id: id }).then((result) => {
        if (result) {
          // update data in db
          RatingOptionModel.updateOne({ _id: id }, {
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

}

module.exports = ratingOptnMasterFunctions;