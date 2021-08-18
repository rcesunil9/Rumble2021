var mongoose = require('mongoose');
var moment = require('moment');
const { parse } = require('json2csv');

var globalServices = require('../services/globalService');

var constants = require('../models/modelConstants');

var DriverMembershipModel = mongoose.model(constants.DriverMembershipModel);
var MembershipModel = mongoose.model(constants.MembershipModel);
var TransactionModel = mongoose.model(constants.TransactionModel);
var UserModel = mongoose.model(constants.UserModel);

let membershipFunctions = {

  view: function (req, res, next) {


    console.log("req", req.body)



    let responseData = { pageTitle: 'Rumble | Membership History' };

    res.render('pages/driver/driver-membership', responseData);



  },




  ListAjax: function (req, res, next) {
    console.log("here", req.body);
    let { fromDate, endDate, memershipId } = req.body;
    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

    // query builder : sort
    let columns = ['', 'name', 'mobile', 'email', 'membership', 'startDate', 'endDate', 'status','transactionId'];
    $column = 'status';

    console.log("coulmn", columns[req.body['order[0][column]']])
    if (columns[req.body['order[0][column]']] != undefined) {
      column = columns[req.body['order[0][column]']];
    }
    console.log("asd", req.body['order[0][dir]'])
     sortOb[column] = (req.body['order[0][dir]'].toUpperCase() == 'ASC' ? 1 : -1);
    // // query builder : pagination
    //let pagination = { skip: +start, limit: +length };

    // // query builder : serach by text
    if (req.body['search[value]']) {
      let searchText = new RegExp(req.body['search[value]']);
      queryOb.$or = [
        { name: { $regex: new RegExp(searchText), $options: 'i' } },
        { email: { $regex: new RegExp(searchText), $options: 'i' } }
      ];
      if (+req.body['search[value]']) {
        queryOb.$or.push({ mobile: +req.body['search[value]'] });
      }
    }
    // // query builder : sort by status

    // if (+statusId) { queryOb.userStatus = statusId; }
    // if (onlineId != "") { queryOb.userOnline = onlineId; }
    // // query builder : sort from date
    // if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // // query builder : sort end date
    // if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }
    // // query builder : role driver
    // queryOb.userRole = '' + global.CONFIGS.role.driver;

   

    var UserModel1 = new UserModel({ _id: '123123123123' });
    var MembershipModel1 = new MembershipModel({ _id: '1123123' });

    var TransactionModel1 = new TransactionModel({ _id: "123123" });
  


    var DriverMembershipModel1 = new DriverMembershipModel({ driverId: UserModel1._id, membershipId: MembershipModel1._id, transactionId: TransactionModel1._id, paymentStatus: '1', startDate: '08/18/2020', endDate: '08/18/2020' });

    // DriverMembershipModel1.save(function (err, book) {
    //   if (err) return console.error(err);
    //   console.log(" saved to bookstore collection.");
    // });

    DriverMembershipModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      DriverMembershipModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // driver

        console.log("query", queryOb)
        console.log("sortob", sortOb)
        //  UserModel.find(queryOb).select({ firstName: 1, lastName: 1, fullName: 1, countryCode: 1, mobile: 1, fullMobile: 1, email: 1, gender: 1, avatar: 1, referralCode: 1, referredBy: 1, isEmailVerified: 1, isMobileVerified: 1, userStatus: 1, userMetaId: 1, driverMetaId: 1, createdAt: 1, userOnline: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: "driverMetaId", model: constants.DriverMetaModel, populate: { path: "activerMembershipIdoffer", model: constants.DriverMembershipModel, match: { endDate: { $gte: new Date() }, startDate: { $lte: new Date() }, paymentStatus: '1' } } }).populate({ path: "userMetaId", model: constants.UserMetaModel, populate: { path: "walletId", model: constants.WalletModel } }).then((userDetail) => {

        function calculateDays(startDate, endDate) {
          var start_date = moment(startDate, 'YYYY-MM-DD');
          var end_date = moment(endDate, 'YYYY-MM-DD');
          var duration = moment.duration(end_date.diff(start_date));
          var days = parseInt( duration.asDays())+1;
          return days;
        }


        DriverMembershipModel.find(queryOb).populate("driverId", 'firstName lastName mobile email').populate("membershipId", 'membershipName').sort(sortOb).then((memberships) => {
      
          if (memberships) {
            let ind = 1;
           
            memberships.forEach(function (u) {
              let data = {};
              data.sr_no = ind;
              data.name = u.driverId.fullName;
              data.mobile = u.driverId.fullMobile;
              data.email = u.driverId.email;
              data.membership = u.membershipId.membershipName;
              data.addedOn = moment(u.startDate).format('MMMM Do YYYY');
              data.expiredOn = moment(u.endDate).format('MMMM Do YYYY');
              data.status = (calculateDays(new Date, u.endDate)>0  ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-danger">Expired</span>');
             
              data.statusnew = (calculateDays(new Date, u.endDate) > 0 ? 'Active' : 'Expired');

              data.transactionId = u.transactionId
              var startDate = moment(u.startDate).format('YYYY-MM-DD');
              var endDate = moment(u.endDate).format('YYYY-MM-DD');

              console.log("startdate", u.endDate)
              console.log("enddate", new Date)
              console.log("days", calculateDays(new Date, u.endDate,));

              console.log("rrr", data.status);
              dtData.push(data);  
              ind++;
            });

            console.log("object", Object.keys(sortOb))
            console.log("value", Object.keys(sortOb)[0])
            
            if (Object.keys(sortOb)[0] == 'membership')
            {
              if (sortOb.membership == 1)
              {
                dtData.sort(compareValues('membership', 'asc'))
              } else {
                dtData.sort(compareValues('membership', 'desc'))
                }
            }
            if (Object.keys(sortOb)[0] == 'status') {
              console.log("value", sortOb.status)
              if (sortOb.status == 1) {
                dtData.sort(compareValues('statusnew', 'asc'))
              } else {
                dtData.sort(compareValues('statusnew', 'desc'))
              }
            }

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



  membershipListApi: function (req, res, next) {

    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "membershipList": []
    }
    var UserModelId = new UserModel({ _id: req.body.userId })
    DriverMembershipModel.find({ driverId: UserModelId._id,paymentStatus:1 }).select({activeStatus:1,  startDate: 1, endDate: 1 }).populate({ path: 'membershipId', model: constants.MembershipModel }).then((membership) => {
      console.log("membership", membership)
      if (membership) {
        var membershipArray = []

        membership.forEach(element => {
          var member = {}
          member.startDate = element.startDate;
          member.expDate = element.endDate;
         // member.status = element.activeStatus;
          member.name = element.membershipId.membershipName;
          member.description = element.membershipId.membershipDesc;
          member.duration = element.membershipId.membershipDuration;
            
          membershipArray.push(member)
        });
        console.log("membership",membership)

        data.responseCode = global.CONFIGS.responseCode.success
        data.responseMessage = global.CONFIGS.api.membershipListSuccess;
        data.membershipList = membershipArray

        res.status(data.responseCode).send(data);
      }
    })

  },

};


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
module.exports = membershipFunctions;