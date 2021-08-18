var mongoose = require('mongoose');
var moment = require('moment');
const { parse } = require('json2csv');

var globalServices = require('../services/globalService');
var constants = require('../models/modelConstants');
var StktCustomerModel = mongoose.model(constants.StktCustomerModel);
var StktDriverModel = mongoose.model(constants.StktDriverModel);
<<<<<<< HEAD
=======
var SupportTypeModel = mongoose.model(constants.SupportTypeModel);
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1

let couponMasterFunctions = {

  viewSCustomer: function (req, res, next) {
    res.render('pages/support-ticket/customer-ticket', {
      pageTitle: 'Rumble | Support Ticket'
    });
  },

  listAjaxSCustomer: function (req, res, next) {
    let { fromDate, endDate, statusId, start, length } = req.body;
    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

    // query builder : sort
    let columns = ['', '', '', 'tktDesc', 'tktStatus', 'createdAt'];
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
        { tktDesc: { $regex: new RegExp(searchText), $options: 'i' } }
      ];
    }
    // query builder : sort by status
    if (statusId && +statusId >= 0) { queryOb.tktStatus = statusId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }

    StktCustomerModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      StktCustomerModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // ticket
        StktCustomerModel.find(queryOb).select({ tktDesc: 1, tktStatus: 1, replies: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: 'replies.userId', model: constants.UserModel, select: { firstName: 1, lastName: 1, fullName: 1 } }).then((ticketDetail) => {
          if (ticketDetail) {
            let ind = 1;
            ticketDetail.forEach(function (u) {
              let data = {};
              data.sr_no = ind;
              if (+u.tktStatus >= 2) {
                data.status = '<span class="badge badge-success">Closed</span>';
              } else {
                data.status = '<select class="form-control" id="status-chng">';
                data.status += '<option value="0" ' + (+u.tktStatus > 0 ? 'disabled' : '') + '>New</option>';
                data.status += '<option value="1" ' + (+u.tktStatus > 1 ? 'disabled' : '') + '>Active</option>';
                data.status += '<option value="2" ' + (+u.tktStatus < 1 ? 'disabled' : '') + '>Closed</option>';
                data.status += '</select>';
                data.status += '<button class="btn btn-sm btn-primary" id="update-status" data-id="' + u._id + '"><i class="fa fa-save"></i></a>';
              }
              if (+u.tktStatus == 1) {
                data.action = '<button class="btn btn-info btn-xs" id="reply-tkt" href="#" data-id="' + u._id + '">Reply</button>';
              }
              data.desc = u.tktDesc;
              data.reply = '';
              u.replies.forEach(function (item, index) {
                data.reply += '<strong>' + item.userId.fullName + '</strong> :<br>';
                data.reply += '<small>' + item.replyDesc + '</small>';
                if (index) data.reply += '<hr>';
              });
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
        }).catch((err) => {
          console.log(err);
        })
      });
    });
  },

  replyPostSCustomer: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong", field: "desc" };
    let { id, desc } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check already registered
      StktCustomerModel.findOne({ _id: id })
        .then((result) => {
          if (result) {
            // save data in db
            result.replies = [];
            result.replies.push({ userId: req.user._id, replyDesc: desc });
            return result.save()
              .then((resultSave) => {
                if (resultSave) {
                  responseData.status = 200;
                  responseData.msg = "Added Successfully !";
                  res.status(responseData.status).send(responseData);
                } else {
                  res.status(responseData.status).send(responseData);
                }
              }).catch((err) => {
                console.log(err);
              })
          } else {
            responseData.msg = 'Record Not Found.';
            res.status(responseData.status).send(responseData);
          }
        }).catch((err) => {
          console.log(err);
        })
    }
  },

  updateStatusSCustomer: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { id, status } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check type
      StktCustomerModel.findOne({ _id: id }).then((result) => {
        if (result) {
          if (+result.tktStatus == 1 && +status == 2 && !result.replies.length) {
            responseData.msg = "Please Submit Reply !";
            res.status(responseData.status).send(responseData);
          } else {
            // update data in db
            StktCustomerModel.updateOne({ _id: id }, {
              $set: {
                tktStatus: '' + status,
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
        } else {
          responseData.msg = 'Record Not Found.';
          res.status(responseData.status).send(responseData);
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  },

  viewSDriver: function (req, res, next) {
    res.render('pages/support-ticket/driver-ticket', {
      pageTitle: 'Rumble | Support Ticket'
    });
  },

  listAjaxSDriver: function (req, res, next) {
    let { fromDate, endDate, statusId, start, length } = req.body;
    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

    // query builder : sort
    let columns = ['', '', '', 'tktDesc', 'tktStatus', 'createdAt'];
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
        { tktDesc: { $regex: new RegExp(searchText), $options: 'i' } }
      ];
    }
    // query builder : sort by status
    if (statusId && +statusId >= 0) { queryOb.tktStatus = statusId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }

    StktDriverModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      StktDriverModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // ticket
        StktDriverModel.find(queryOb).select({ tktDesc: 1, tktStatus: 1, replies: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: 'replies.userId', model: constants.UserModel, select: { firstName: 1, lastName: 1, fullName: 1 } }).then((ticketDetail) => {
          if (ticketDetail) {
            let ind = 1;
            ticketDetail.forEach(function (u) {
              let data = {};
              data.sr_no = ind;
              if (+u.tktStatus >= 2) {
                data.status = '<span class="badge badge-success">Closed</span>';
              } else {
                data.status = '<select class="form-control" id="status-chng">';
                data.status += '<option value="0" ' + (+u.tktStatus > 0 ? 'disabled' : '') + '>New</option>';
                data.status += '<option value="1" ' + (+u.tktStatus > 1 ? 'disabled' : '') + '>Active</option>';
                data.status += '<option value="2" ' + (+u.tktStatus < 1 ? 'disabled' : '') + '>Closed</option>';
                data.status += '</select>';
                data.status += '<button class="btn btn-sm btn-primary" id="update-status" data-id="' + u._id + '"><i class="fa fa-save"></i></a>';
              }
              if (+u.tktStatus == 1) {
                data.action = '<button class="btn btn-info btn-xs" id="reply-tkt" href="#" data-id="' + u._id + '">Reply</button>';
              }
              data.desc = u.tktDesc;
              data.reply = '';
              u.replies.forEach(function (item, index) {
                data.reply += '<strong>' + item.userId.fullName + '</strong> :<br>';
                data.reply += '<small>' + item.replyDesc + '</small>';
                if (index) data.reply += '<hr>';
              });
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
        }).catch((err) => {
          console.log(err);
        })
      });
    });
  },

  replyPostSDriver: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong", field: "desc" };
    let { id, desc } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check already registered
      StktDriverModel.findOne({ _id: id })
        .then((result) => {
          if (result) {
            // save data in db
            result.replies = [];
            result.replies.push({ userId: req.user._id, replyDesc: desc });
            return result.save()
              .then((resultSave) => {
                if (resultSave) {
                  responseData.status = 200;
                  responseData.msg = "Added Successfully !";
                  res.status(responseData.status).send(responseData);
                } else {
                  res.status(responseData.status).send(responseData);
                }
              }).catch((err) => {
                console.log(err);
              })
          } else {
            responseData.msg = 'Record Not Found.';
            res.status(responseData.status).send(responseData);
          }
        }).catch((err) => {
          console.log(err);
        })
    }
  },

  updateStatusSDriver: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { id, status } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check type
      StktDriverModel.findOne({ _id: id }).then((result) => {
        if (result) {
          if (+result.tktStatus == 1 && +status == 2 && !result.replies.length) {
            responseData.msg = "Please Submit Reply !";
            res.status(responseData.status).send(responseData);
          } else {
            // update data in db
            StktDriverModel.updateOne({ _id: id }, {
              $set: {
                tktStatus: '' + status,
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
        } else {
          responseData.msg = 'Record Not Found.';
          res.status(responseData.status).send(responseData);
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  },

<<<<<<< HEAD
=======
  supportTypeListApi: function (req, res, next) {

    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "supportTypeList": []
    }
    SupportTypeModel.find().then((type) => {
      console.log("brand", type)
      if (type) {

        data.responseCode = global.CONFIGS.responseCode.success
        data.responseMessage = global.CONFIGS.api.addSupportTypeSuccess;
        data.supportTypeList = type

        res.status(data.responseCode).send(data);
      }
    })

  },
  addSupporttypeApi: function (req, res, next) {
    const { supportType } = req.body
    console.log("req",req.body)
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",

    }
    SupportTypeModel.create({
      supportType: supportType,

    }, (err, result) => {
      console.log("err",err)
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

>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
};

module.exports = couponMasterFunctions;