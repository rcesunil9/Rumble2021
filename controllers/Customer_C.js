var mongoose = require('mongoose');
var moment = require('moment');
const { parse } = require('json2csv');

var globalServices = require('../services/globalService');
var constants = require('../models/modelConstants');
var UserModel = mongoose.model(constants.UserModel);
var UserMetaModel = mongoose.model(constants.UserMetaModel);
var WalletModel = mongoose.model(constants.WalletModel);

let customerFunctions = {

  customerList: function (req, res, next) {
    res.render('pages/customer/customer-list', {
      pageTitle: 'Rumble | Customer List'
    });
  },

  customerListAjax: function (req, res, next) {
    let { fromDate, endDate, statusId, start, length } = req.body;
    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

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
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }
    // query builder : role driver
     queryOb.userRole = ''+global.CONFIGS.role.customer;

    UserModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      UserModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // driver
        UserModel.find(queryOb).select({ firstName: 1, lastName: 1, fullName: 1, countryCode: 1, mobile: 1, fullMobile: 1, email: 1, gender: 1, avatar: 1, referralCode: 1, referredBy: 1, isEmailVerified: 1, isMobileVerified: 1, userStatus: 1, userMetaId: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: "userMetaId", model: constants.UserMetaModel, populate: { path: "walletId", model: constants.WalletModel } }).then((userDetail) => {
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
              dtData.push(data);
            });
          }
<<<<<<< HEAD
=======

          if (Object.keys(sortOb)[0] == 'mobile') {
            if (sortOb.mobile == 1) {
              dtData.sort(compareValues('full_mobile', 'asc'))
            } else {
              dtData.sort(compareValues('full_mobile', 'desc'))
            }
          }
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
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

  customerListDownload: function (req, res, next) {
    let { fromDate, endDate, statusId } = req.query;
    let queryOb = {};

    // query builder : sort by status
    if (+statusId) { queryOb.userStatus = statusId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }
    // query builder : role driver
    // queryOb.userRole = '3';

    UserModel.find(queryOb).select({ firstName: 1, mobile: 1, email: 1 }).exec(function (err, results) {
      let fields = ['firstName', 'mobile', 'email'];
      let opts = { fields };
      let csv = parse(results, opts);
      res.setHeader('Content-disposition', 'attachment; filename=customers.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
    });
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
module.exports = customerFunctions;