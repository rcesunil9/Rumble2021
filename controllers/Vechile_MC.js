var mongoose = require('mongoose');
var moment = require('moment');
const { parse } = require('json2csv');

var globalServices = require('../services/globalService');
<<<<<<< HEAD

var constants = require('../models/modelConstants');
var VehicleBrandModel = mongoose.model(constants.VehicleBrandModel);
var VehicleModelModel = mongoose.model(constants.VehicleModelModel);
var VehicleTypeModel = mongoose.model(constants.VehicleTypeModel);
=======
var Schema = mongoose.Schema;
var constants = require('../models/modelConstants');
var VehicleBrandModel = mongoose.model(constants.VehicleBrandModel);
var VehicleModelModel = mongoose.model(constants.VehicleModelModel);
var VehicleModel = mongoose.model(constants.VehicleModel);
var VehicleTypeModel = mongoose.model(constants.VehicleTypeModel);
var VehicleColorModel = mongoose.model(constants.VehicleColorModel);
var UserModel = mongoose.model(constants.UserModel);


>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1

let vechileMasterFunctions = {

  view: function (req, res, next) {


    let responseData = { pageTitle: 'Rumble | Dashboard' };

    VehicleBrandModel.find({ activeStatus: '1' }, (err, brand) => {
      if (err) {
        responseData.error = err;
        return res.render('component/vechile-master', responseData);
      } else {
        responseData.brand = brand;
        res.render('component/vechile-master', responseData);
      }
    })

  },

<<<<<<< HEAD

=======
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
  listAjaxBrand: function (req, res, next) {

    let { fromDate, endDate, statusId, start, length } = req.body;

    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

    // query builder : sort
    let columns = ['', '', 'vehicleBrandName', 'status', 'createdAt'];
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
        { vehicleBrandName: { $regex: new RegExp(searchText), $options: 'i' } }
      ];
    }
    // query builder : sort by status
    //queryOb.activeStatus = statusId;
    if (+statusId) { queryOb.activeStatus = statusId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }

    VehicleBrandModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      VehicleBrandModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // driver
        VehicleBrandModel.find({ activeStatus: '1' }, (err, brand) => {
          if (err) {
            responseData.error = err;

          } else {

            vehicalBrands = brand;

            VehicleBrandModel.find(queryOb).select({ _id: 1, vehicleBrandName: 1, activeStatus: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).then((brandDetail) => {
              if (brandDetail) {
                let ind = 1;
                brandDetail.forEach(function (u) {
                  let data = {};

                  data.sr_no = ind;
                  data.action = '';
                  if (+u.activeStatus != 2) {
                    data.action += '<button class="btn btn-info btn-xs" id="addupdate-vbrand" href="#" data-id="' + u._id + '"><i class="fas fa-pencil-alt"></i> Edit</button>';
                    data.action += (+u.activeStatus == 1 ? '<button class="btn btn-danger btn-xs" id="brand-status" href="#" data-id="' + u._id + '" data-status="0">Inactive</button>' : '<button class="btn btn-primary btn-xs" id="brand-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');
                    data.action += '<button class="btn btn-warning btn-xs" id="brand-status" href="#" data-id="' + u._id + '" data-status="2"><i class="fas fa-trash"></i> Delete</button>';
                  }
                  data.title = u.vehicleBrandName;
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
                "brands": vehicalBrands,
              });

              res.send(jsonData);
            });
          }
        });
      });
    });
  },

  addBrandPost: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check already registered
      VehicleBrandModel.findOne({ vehicleBrandName: req.body.name })
        .then((result) => {
          if (result) {
            responseData.msg = 'Already, vechile brand has registered.';
            res.status(responseData.status).send(responseData);
          }
          else {
            // save data in db
            VehicleBrandModel.create({
              vehicleBrandName: req.body.name,
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

  getBrandById: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // get data
      VehicleBrandModel.findOne({ _id: id })
        .then((result) => {
          if (result) {
            responseData.vechileBrand = result;
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

  updateBrandPost: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check already registered
      VehicleBrandModel.findOne({ vehicleBrandName: req.body.name, _id: { $ne: id } })
        .then((result) => {
          if (result) {
            responseData.msg = 'Already, vechile brand has registered.';
            res.status(responseData.status).send(responseData);
          }
          else {
            // save data in db
            VehicleBrandModel.updateOne({ _id: id }, {
              $set: {
                vehicleBrandName: req.body.name
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

  updateBrandStatus: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { id, status, type } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check type
      VehicleBrandModel.findOne({ _id: id }).then((result) => {
        if (result) {
          // update data in db
          VehicleBrandModel.updateOne({ _id: id }, {
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
              VehicleTypeModel.update({ vehicleBrandId: id }, {
                $set: {
                  activeStatus: '' + status,
                }
              }, { multi: true }, (err1, result1) => {
                if (err1) {
                  responseData.status = 200;
                  responseData.msg = "Updated Successfully !";
                  res.status(responseData.status).send(responseData);
                } else {

                  VehicleModelModel.update({ vehicleBrandId: id }, {
                    $set: {
                      activeStatus: '' + status,
                    }
                  }, { multi: true }, (err2, result2) => {
                    console.log(err2, result2)
                    if (err2) {
                      responseData.status = 200;
                      responseData.msg = "Updated Successfully !";
                      res.status(responseData.status).send(responseData);
                    } else {
                      responseData.status = 200;
                      responseData.msg = "Updated Successfully !";
                      res.status(responseData.status).send(responseData);
                    }
                  })

                }
              })
            }
          })
        } else {
          responseData.msg = 'Record Not Found.';
          res.status(responseData.status).send(responseData);
        }
      })
    }
  },

  listAjaxModel: function (req, res, next) {
    let { fromDate, endDate, statusId, start, length, brandId } = req.body;
    console.log("brandId", brandId)
    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

    // query builder : sort
    let columns = ['', '', 'vehicleBrandName', 'vehicleModelName', 'activeStatus', 'createdAt'];
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
        { vehicleModelName: { $regex: new RegExp(searchText), $options: 'i' } },
        { vehicleBrandName: { $regex: new RegExp(searchText), $options: 'i' } }
      ];
    }

    if (brandId) {
      // query builder : sort by status
      var vehicleBrandId = new VehicleBrandModel({
        _id: brandId
      });
      queryOb.vehicleBrandId = vehicleBrandId._id;
    }

    if (+statusId) { queryOb.activeStatus = statusId; }

<<<<<<< HEAD
    console.log("activestatus",statusId)
    
=======
    console.log("activestatus", statusId)

>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1

    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }

    VehicleModelModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      VehicleModelModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        VehicleBrandModel.find({ activeStatus: '1' }, (err, brand) => {
          if (err) {
            responseData.error = err;

          } else {

            vehicalBrands = brand;
            // driver
<<<<<<< HEAD
            VehicleModelModel.find(queryOb).select({ vehicleModelName: 1, activeStatus: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: 'vehicleBrandId', model: constants.VehicleBrandModel }).then((modelDetail) => {
=======
            VehicleModelModel.find(queryOb).select({ vehicleModelName: 1, vehicleType: 1, activeStatus: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: 'vehicleBrandId', model: constants.VehicleBrandModel }).then((modelDetail) => {
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
              if (modelDetail) {
                let ind = 1;
                modelDetail.forEach(function (u) {
                  let data = {};
                  data.sr_no = ind;
                  data.action = '';
                  if (+u.activeStatus != 2) {
                    data.action += '<button class="btn btn-info btn-xs" id="addupdate-vmodel" href="#" data-id="' + u._id + '"><i class="fas fa-pencil-alt"></i> Edit</button>';
                    data.action += (+u.activeStatus == 1 ? '<button class="btn btn-danger btn-xs" id="model-status" href="#" data-id="' + u._id + '" data-status="0">Inactive</button>' : '<button class="btn btn-primary btn-xs" id="model-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');
                    data.action += '<button class="btn btn-warning btn-xs" id="model-status" href="#" data-id="' + u._id + '" data-status="2"><i class="fas fa-trash"></i> Delete</button>';
                  }
                  data.title = u.vehicleModelName;
                  data.brand = u.vehicleBrandId.vehicleBrandName;
<<<<<<< HEAD
=======
                  data.type = u.vehicleType;
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
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
                "brands": vehicalBrands,
              });
              res.send(jsonData);

            });

          }
        });

      });
    });
  },

  addModelPost: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

<<<<<<< HEAD
=======
    console.log("in add post")
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {

      var vehicleBrandId = new VehicleBrandModel({
        _id: req.body.brandId
      });


      // check already registered
      VehicleModelModel.findOne({ vehicleModelName: req.body.name })
        .then((result) => {
          if (result) {
            responseData.msg = 'Already, vechile model has registered.';
            res.status(responseData.status).send(responseData);
          }
          else {
            // save data in db
            VehicleModelModel.create({
              vehicleModelName: req.body.name,
              vehicleBrandId: vehicleBrandId._id,
<<<<<<< HEAD
=======
              vehicleType: req.body.type,
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
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

  getModelById: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // get data
      VehicleModelModel.findOne({ _id: id })
        .then((result) => {
          if (result) {
            responseData.vechileModel = result;
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

  updateModelPost: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
<<<<<<< HEAD
=======
      var vehicleBrandId = new VehicleBrandModel({
        _id: req.body.brandId
      });

>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
      // check already registered
      VehicleModelModel.findOne({ vehicleModelName: req.body.name, _id: { $ne: id } })
        .then((result) => {
          if (result) {
            responseData.msg = 'Already, vechile model has registered.';
            res.status(responseData.status).send(responseData);
          }
          else {
            // save data in db
            VehicleModelModel.updateOne({ _id: id }, {
              $set: {
<<<<<<< HEAD
                vehicleModelName: req.body.name
=======
                vehicleModelName: req.body.name,
                vehicleBrandId: vehicleBrandId._id,
                vehicleType: req.body.type
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
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

  updateModelStatus: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { id, status, type } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check type
      VehicleModelModel.findOne({ _id: id }).then((result) => {
        if (result) {
          // update data in db
          VehicleModelModel.updateOne({ _id: id }, {
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

  listAjaxType: function (req, res, next) {
<<<<<<< HEAD
    let { fromDate, endDate, statusId, start, length ,brandId} = req.body;
=======
    let { fromDate, endDate, statusId, start, length, brandId } = req.body;
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

    // query builder : sort
<<<<<<< HEAD
    let columns = ['', '', 'vehicleTypeName', 'activeStatus', 'createdAt'];
=======
    let columns = ['', '', '', 'vehicleTypeName', 'activeStatus', 'createdAt'];
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
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
        { vehicleTypeName: { $regex: new RegExp(searchText), $options: 'i' } }
      ];
    }

    if (brandId) {
      // query builder : sort by brand
      var vehicleBrandId = new VehicleBrandModel({
        _id: brandId
      });
      queryOb.vehicleBrandId = vehicleBrandId._id;
    }

    // query builder : sort by status
<<<<<<< HEAD
   // queryOb.activeStatus = statusId;
=======
    // queryOb.activeStatus = statusId;
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    if (+statusId) { queryOb.activeStatus = statusId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }

    VehicleTypeModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      VehicleTypeModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // driver
<<<<<<< HEAD
        VehicleTypeModel.find(queryOb).select({ vehicleTypeName: 1, activeStatus: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: 'vehicleBrandId', model: constants.VehicleBrandModel }).then((typeDetail) => {
=======
        VehicleTypeModel.find(queryOb).select({ vehicleTypeName: 1, activeStatus: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: 'vehicleBrandId', model: constants.VehicleBrandModel }).populate({ path: 'vehicleModelId', model: constants.VehicleModelModel }).then((typeDetail) => {
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
          if (typeDetail) {
            let ind = 1;
            typeDetail.forEach(function (u) {
              let data = {};
              data.sr_no = ind;
              data.action = '';
              if (+u.activeStatus != 2) {
                data.action += '<button class="btn btn-info btn-xs" id="addupdate-vtype" href="#" data-id="' + u._id + '"><i class="fas fa-pencil-alt"></i> Edit</button>';
                data.action += (+u.activeStatus == 1 ? '<button class="btn btn-danger btn-xs" id="type-status" href="#" data-id="' + u._id + '" data-status="0">Inactive</button>' : '<button class="btn btn-primary btn-xs" id="type-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');
                data.action += '<button class="btn btn-warning btn-xs" id="type-status" href="#" data-id="' + u._id + '" data-status="2"><i class="fas fa-trash"></i> Delete</button>';
              }
              data.title = u.vehicleTypeName;
              data.brand = u.vehicleBrandId.vehicleBrandName;
<<<<<<< HEAD
=======
              data.model = u.vehicleModelId.vehicleModelName;
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
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

  addTypePost: function (req, res, next) {
<<<<<<< HEAD
=======
    console.log("add type post", req.body)
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check already registered
<<<<<<< HEAD
      VehicleTypeModel.findOne({ vehicleTypeName: req.body.name, vehicleBrandId: req.body.brandId })
=======
      VehicleTypeModel.findOne({ vehicleTypeName: req.body.name, vehicleBrandId: req.body.brandId, vehicleModelId: req.body.modelId })
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
        .then((result) => {
          if (result) {
            responseData.msg = 'Already, vechile type has registered.';
            res.status(responseData.status).send(responseData);
          }
          else {

            var vehicleBrandId = new VehicleBrandModel({
              _id: req.body.brandId,

            });
<<<<<<< HEAD
=======
            var vehicleModelId = new VehicleModelModel({
              _id: req.body.modelId,

            });
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1

            // save data in db
            VehicleTypeModel.create({
              vehicleTypeName: req.body.name,
              activeStatus: '1',
              vehicleBrandId: vehicleBrandId._id,
<<<<<<< HEAD
=======
              vehicleModelId: vehicleModelId._id
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
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

  getTypeById: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // get data
      VehicleTypeModel.findOne({ _id: id })
        .then((result) => {
          if (result) {
            responseData.vechileType = result;
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

  updateTypePost: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check already registered
      VehicleTypeModel.findOne({ vehicleTypeName: req.body.name, _id: { $ne: id } })
        .then((result) => {
          if (result) {
            responseData.msg = 'Already, vechile type has registered.';
            res.status(responseData.status).send(responseData);
          }
          else {
            // save data in db
            VehicleTypeModel.updateOne({ _id: id }, {
              $set: {
                vehicleTypeName: req.body.name
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

  updateTypeStatus: function (req, res, next) {
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { id, status, type } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check type
      VehicleTypeModel.findOne({ _id: id }).then((result) => {
        if (result) {
          // update data in db
          VehicleTypeModel.updateOne({ _id: id }, {
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

<<<<<<< HEAD
=======

  listAjaxColor: function (req, res, next) {

    let { fromDate, endDate, statusId, start, length, brandId } = req.body;
    let dtData = [],
      queryOb = {},
      sortOb = {},
      recordsTotal = 0,
      recordsFiltered = 0;

    // query builder : sort
    let columns = ['', '', '', 'vehicleColorName', 'activeStatus', 'createdAt'];
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
        { vehicleColorName: { $regex: new RegExp(searchText), $options: 'i' } }
      ];
    }

    if (brandId) {
      // query builder : sort by brand
      var vehicleBrandId = new VehicleBrandModel({
        _id: brandId
      });
      queryOb.vehicleBrandId = vehicleBrandId._id;
    }

    // query builder : sort by status
    // queryOb.activeStatus = statusId;

    if (+statusId) { queryOb.activeStatus = statusId; }
    // query builder : sort from date
    if (fromDate) { queryOb.createdAt = { $gte: new Date(fromDate) }; }
    // query builder : sort end date
    if (endDate) { queryOb.createdAt = { $lte: new Date(endDate) }; }
    console.log("queryOb", queryOb)

    VehicleColorModel.count({}, function (err, c) {
      if (c == undefined) { c = 0; }
      recordsTotal = c;
      VehicleColorModel.count(queryOb, function (err, c) {
        if (c == undefined) { c = 0; }
        recordsFiltered = c;
        // driver
        VehicleColorModel.find(queryOb).select({ vehicleColorName: 1, activeStatus: 1, createdAt: 1 }).sort(sortOb).skip(pagination.skip).limit(pagination.limit).populate({ path: 'vehicleBrandId', model: constants.VehicleBrandModel }).populate({ path: 'vehicleModelId', model: constants.VehicleModelModel }).then((colorDetail) => {
          if (colorDetail) {

            let ind = 1;
            colorDetail.forEach(function (u) {
              console.log("colorDetails", u)
              let data = {};
              data.sr_no = ind;
              data.action = '';
              if (+u.activeStatus != 2) {
                data.action += '<button class="btn btn-info btn-xs" id="addupdate-vcolor" href="#" data-id="' + u._id + '"><i class="fas fa-pencil-alt"></i> Edit</button>';
                data.action += (+u.activeStatus == 1 ? '<button class="btn btn-danger btn-xs" id="color-status" href="#" data-id="' + u._id + '" data-status="0">Inactive</button>' : '<button class="btn btn-primary btn-xs" id="type-status" href="#" data-id="' + u._id + '" data-status="1">Active</button>');
                data.action += '<button class="btn btn-warning btn-xs" id="color-status" href="#" data-id="' + u._id + '" data-status="2"><i class="fas fa-trash"></i> Delete</button>';
              }
              data.title = u.vehicleColorName;
              data.brand = u.vehicleBrandId.vehicleBrandName;
              data.model = u.vehicleModelId.vehicleModelName;
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
          console.log("json", dtData)
          res.send(jsonData);
        });
      });
    });
  },

  addColorPost: function (req, res, next) {
    console.log("req.body", req.body)
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check already registered
      VehicleColorModel.findOne({ vehicleColorName: req.body.name, vehicleBrandId: req.body.brandId, vehicleModelId: req.body.modelId })
        .then((result) => {
          if (result) {
            responseData.msg = 'Already,vehicle color has registered.';
            res.status(responseData.status).send(responseData);
          }
          else {

            var vehicleBrandId = new VehicleBrandModel({
              _id: req.body.brandId,

            });
            var vehicleModelId = new VehicleModelModel({
              _id: req.body.modelId,

            });

            // save data in db
            VehicleColorModel.create({
              vehicleColorName: req.body.name,
              activeStatus: '1',
              vehicleBrandId: vehicleBrandId._id,
              vehicleModelId: vehicleModelId._id
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

  getColorById: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // get data
      VehicleColorModel.findOne({ _id: id })
        .then((result) => {
          if (result) {
            responseData.vehicleColor = result;
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

  updateColorPost: function (req, res, next) {
    let { id } = req.params;
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check already registered
      VehicleColorModel.findOne({ vehicleColorName: req.body.name, _id: { $ne: id } })
        .then((result) => {
          if (result) {
            responseData.msg = 'Already, vechile color has registered.';
            res.status(responseData.status).send(responseData);
          }
          else {
            // save data in db
            VehicleColorModel.updateOne({ _id: id }, {
              $set: {
                vehicleColorName: req.body.name
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

  updateColorStatus: function (req, res, next) {
    console.log("req", req.body)
    let responseData = { status: 400, msg: "Something Went Wrong" };
    let { id, status, type } = req.body;
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.msg = validationError;
      res.status(responseData.status).send(responseData);
    } else {
      // check type
      VehicleColorModel.findOne({ _id: id }).then((result) => {
        if (result) {
          // update data in db
          VehicleColorModel.updateOne({ _id: id }, {
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

  vehicleBrandsApi: function (req, res, next) {

    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "vehicleBrand": []
    }
    VehicleBrandModel.find().select({ _id: 1 ,vehicleBrandName:1}).then((brand) => {
      console.log("brand", brand)
      if (brand) {
        
          brand.push({
            "vehicleBrandName": "Please select",
            "_id": "",
           
          });

        data.responseCode = global.CONFIGS.responseCode.success
        data.responseMessage = global.CONFIGS.api.brandListSuccess;
        data.vehicleBrand = brand.reverse()

        res.status(data.responseCode).send(data);
      }
    })

  },

  vehicleColorApi: function (req, res, next) {
    let { vehicleModelId } = req.body;
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "vehicleColor": []
    }
    var NewVehicleModelModel = new VehicleModelModel({ _id: vehicleModelId })
    VehicleColorModel.find({ vehicleModelId: NewVehicleModelModel._id }).select({_id:1,vehicleColorName:1}).then((color) => {
      console.log("color", color)
      if (color) {
        color.push({
          "vehicleColor": "Please select",
          "_id": "",
        
        })
        data.responseCode = global.CONFIGS.responseCode.success
        data.responseMessage = global.CONFIGS.api.colorListSuccess;
        data.vehicleColor = color.reverse()

        res.status(data.responseCode).send(data);
      }
    })

  },

  vehicleModelApi: function (req, res, next) {
    let { vehicleBrandId } = req.body;
    let dtData = []
    console.log("vehiclebrandId", vehicleBrandId)
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",

    }


    var newBrand = new VehicleBrandModel({ _id: vehicleBrandId });

    VehicleModelModel.find({ vehicleBrandId: newBrand._id }).select({ _id: 1, vehicleModelName: 1, vehicleType: 1 }).then((model) => {
      console.log("model", model)
      if (model) {
        model.push({
          "vehicleType": "Please select",
          "_id": "",
          "vehicleModelName": ""
        })

        data.responseCode = global.CONFIGS.responseCode.success
        data.responseMessage = global.CONFIGS.api.brandListSuccess;
        data.vehicleModel = model.reverse();


        res.status(data.responseCode).send(data);
      }
    })

    // // brandModel._id = vehicleBrandId;
    // VehicleModelModel.find({ vehicleBrandId: newBrand._id }).then((model) => {
    //   //console.log("model", model)
    //   if (model) {


    //     Promise.all(
    //       model.map(u => {
    //         var data = {}

    //         return new Promise((resolve) => {

    //           VehicleTypeModel.find({ vehicleModelId: u._id }).then(response => {
    //             var vehicleType = []
    //             //console.log("response",response)
    //             if (response.length > 0) {
    //               response.map(e => {
    //                 //console.log("datae",e)
    //                 vehicleType.push(e)
    //               });
    //             }
    //             data.model = u
    //             data.type = vehicleType
    //             return new Promise(() => {
    //               //console.log(data)
    //               dtData.push(data)
    //               resolve()

    //             })
    //           })

    //         })
    //       })

    //     ).then(() => {
    //       data.responseCode = global.CONFIGS.responseCode.success
    //       data.responseMessage = global.CONFIGS.api.modelListSuccess;
    //       data.vehicleModel = dtData
    //       res.status(data.responseCode).send(data);
    //     })

    //   }
    // })

  },

  manage_vehicle: function (req, res, next) {
    const { userId, vehicleType, vehicleBrandId, vehicleModelId, vehicleNumber, vehicleYear, vehicleColor } = req.body;



    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",

    }

    console.log("requeset", req.body)


    try {

      UserModel.findOne({ _id: userId })
        .then((result) => {
          console.log("result", result)

          if (!result) {

            data.responseCode = global.CONFIGS.responseCode.error
            data.responseMessage = global.CONFIGS.api.userNotFound;
            res.send(data)
          }
          else {
            // generate hash



            VehicleModel.updateOne({ driverId: result._id }, {
              $set: {
                vehicleBrandId: vehicleBrandId,
                vehicleModelId: vehicleModelId,
                vehicleType: vehicleType,
                vehicleNumber: vehicleNumber,
                vehicleYear: vehicleYear,
                vehicleColor: vehicleColor,

              }
            }, (err, result) => {
                console.log("err",err)
              if (err) {

                data.responseCode = global.CONFIGS.responseCode.error
                data.responseMessage = global.CONFIGS.api.edit_driver_detailsFail;
                res.send(data)
              } else {

                data.responseCode = global.CONFIGS.responseCode.success
                data.responseMessage = global.CONFIGS.api.edit_driver_detailsSuccess;

                res.send(data)


              }
            });

          }
        })

    }
    catch (ex) {
      console.log("exception", ex)
      data.responseCode = global.CONFIGS.responseCode.error
      data.responseMessage = global.CONFIGS.api.userNotFound;
      res.send(data)
    }
  },


>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
};

module.exports = vechileMasterFunctions;