var mongoose = require('mongoose');
<<<<<<< HEAD
=======
var jwt = require('jsonwebtoken');
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
var moment = require('moment');
const bcrypt = require('bcryptjs');
var randomstring = require('randomstring');
const passport = require('passport');

var globalServices = require('../services/globalService');
var constants = require('../models/modelConstants');
var UserModel = mongoose.model(constants.UserModel);
<<<<<<< HEAD
var BookingPaymentModel = mongoose.model(constants.BookingPaymentModel);
var StktCustomerModel = mongoose.model(constants.StktCustomerModel);
var StktDriverModel = mongoose.model(constants.StktDriverModel);
=======
var vehicleModel = mongoose.model(constants.VehicleModel);
var DriverMetaModel = mongoose.model(constants.DriverMetaModel);
var BookingPaymentModel = mongoose.model(constants.BookingPaymentModel);
var StktCustomerModel = mongoose.model(constants.StktCustomerModel);
var StktDriverModel = mongoose.model(constants.StktDriverModel);
var VehicleBrandModel = mongoose.model(constants.VehicleBrandModel);
var VehicleModelModel = mongoose.model(constants.VehicleModelModel);
var VehicleTypeModel = mongoose.model(constants.VehicleTypeModel);

>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1

let usersFunctions = {

  loginIn: function (req, res, next) {
    res.render('login', {
      pageTitle: 'Rumble | Login'
    });
  },

  loginInPost: function (req, res, next) {
    let responseData = { pageTitle: 'Rumble | Login' };

    passport.authenticate('local', (err, user, info) => {
      // validation error
      console.log("user", user)
      console.log("info", info)
      if (err) {
        responseData.error = err;
        return res.render('login', responseData);
      }
      // user not found
      if (!user) {
        responseData.error = info.message;
        return res.render('login', responseData);
      }
      // establish session
      req.logIn(user, function (err) {
        if (err) {
          responseData.error = 'Something went wrong';
          return res.render('login', responseData);
        } else {
          return res.redirect('/admin/dashboard');
        }
      });
    })(req, res, next);
  },

  register: function (req, res, next) {
    res.render('register', {
      pageTitle: 'Rumble | Register'
    });
  },



  registerPost: function (req, res, next) {
    let responseData = { pageTitle: 'Rumble | Register' };
    let { validationError } = req;

    // validate request
    if (validationError != undefined && validationError) {
      responseData.error = validationError;
      responseData.reqBody = req.body;
      return res.render('register', responseData);
    } else {
      // check already registered
      UserModel.findOne({ $or: [{ phoneNumber: req.body.phone }, { email: req.body.email }] })
        .then((result) => {
          if (result) {
            responseData.reqBody = req.body;
            responseData.error = 'Already registered with same number or email.';
            return res.render('register', responseData);
          }
          else {
            // generate hash
            bcrypt.genSalt(10, (err, salt) => {
              if (err) {
                responseData.error = err;
                return res.render('register', responseData);
              } else {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                  if (err) {
                    responseData.error = err;
                    return res.render('register', responseData);
                  } else {
                    // extract first & last name
                    let arrFullName = req.body.fullname.split(' ');
                    let firstName = lastName = '';
                    if (arrFullName.length === 1) {
                      firstName = arrFullName[0];
                    } else {
                      firstName = req.body.fullname.split(' ').slice(0, -1).join(' ');
                      lastName = req.body.fullname.split(' ').slice(-1).join(' ');
                    }
                    // save data in db
                    UserModel.create({
                      firstName: firstName,
                      lastName: lastName,
                      countryCode: '+91',
                      mobile: req.body.phone,
                      email: req.body.email,
                      password: hash,
                      verifiyEmailToken: randomstring.generate({ length: 12, charset: 'alphanumeric' }),
                      verifiyMobileOtp: randomstring.generate({ length: 4, charset: 'numeric' }),
                      expTime: new moment().add(10, 'minutes').toDate(),
                      acceptTNC: req.body.acceptTNC,
                    }, (err, result) => {
                      if (err) {
                        if (err.name == 'ValidationError') {
                          responseData.dbError = err.errors;
                          responseData.reqBody = req.body;
                        } else {
                          responseData.error = 'Something went wrong.';
                        }
                        return res.render('register', responseData);
                      } else {
                        responseData.message = "Registered Successfully !";
                        return res.render('register', responseData);
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

  forgotPassword: function (req, res, next) {
    res.render('forgot-password', {
      pageTitle: 'Rumble | forgot-password',
      error: '',
      message: ''
    });
  },

  forgotPasswordPost: function (req, res, next) {
    return res.redirect('/admin/recover-password');
  },

  recoverPassword: function (req, res, next) {
    res.render('recover-password', {
      pageTitle: 'Rumble | Recover-Password',
      error: '',
      message: ''
    });
  },

  recoverPasswordPost: function (req, res, next) {

  },

  dashboard: function (req, res, next) {
<<<<<<< HEAD
  
=======

>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    let responseData = { pageTitle: 'Rumble | Dashboard' };

    //UserModel.count({ isRegistered: '1', userRole: '2' }, (err, driverCount) => {
    UserModel.count({ userRole: '2' }, (err, driverCount) => {
      if (err) {
        responseData.error = err;
        return res.render('pages/dashboard', responseData);
      } else {

        responseData.registeredDriver = driverCount;
        BookingPaymentModel.count({ paymentStatus: '1' }, (err, rideCount) => {
          if (err) {
            responseData.error = err;
            return res.render('pages/dashboard', responseData);
          } else {
            responseData.ridesCompleted = rideCount;
            //UserModel.count({ isRegistered: '1', userRole: '3' }, (err, customerCount) => {
            UserModel.count({ userRole: '3' }, (err, customerCount) => {
              if (err) {
                responseData.error = err;
                return res.render('pages/dashboard', responseData);
              } else {
                responseData.registeredCustomer = customerCount;
                StktDriverModel.count({ 'tktStatus': '1' }, (err, stktDriverCount) => {
                  if (err) {
                    responseData.error = err;
                    return res.render('pages/dashboard', responseData);
                  } else {
                    responseData.stktDriverActive = stktDriverCount;
                    StktDriverModel.count({ 'tktStatus': '2' }, (err, stktDriverCount) => {
                      if (err) {
                        responseData.error = err;
                        return res.render('pages/dashboard', responseData);
                      } else {
                        responseData.stktDriverClosed = stktDriverCount;
                        StktCustomerModel.count({ 'tktStatus': '1' }, (err, stktCustomerCount) => {
                          if (err) {
                            responseData.error = err;
                            return res.render('pages/dashboard', responseData);
                          } else {
                            responseData.stktCustomerActive = stktCustomerCount;
                            StktCustomerModel.count({ 'tktStatus': '2' }, (err, stktCustomerCount) => {
                              if (err) {
                                responseData.error = err;
                                return res.render('pages/dashboard', responseData);
                              } else {
                                responseData.stktCustomerClosed = stktCustomerCount;
                                return res.render('pages/dashboard', responseData);
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  logout: function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/admin');
<<<<<<< HEAD
  }
=======
  },

  registrationApi: function (req, res, next) {

  },

  loginApi: function (req, res, next) {
    const { mobile, password, user_type, device_id, fcm_key, deviceType } = req.body;
    console.log("req", req.body)
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "userId": "",
      "sessionToken": "",
      "first_name": "",
      "last_name": "",
      "mobile": "",
      "email": "",
      "referral_code": "",
      "Gender": "",
      "Profile_pic": "",
    }

    UserModel.findOne({ "mobile": mobile, userRole: user_type }, (err, user) => {
      console.log("user", user)
      if (!err && user) {
        // We could compare passwords in our model instead of below as well
        bcrypt.compare(password, user.password).then(match => {
          if (match) {

            // Create a token
            const payload = { mobile: user.mobile };
            const options = { expiresIn: '1d', issuer: 'rumble' };
            const secret = process.env.SECRETKEY;
            const token = jwt.sign(payload, secret, options);
            data.sessionToken = token;
            data.responseMessage = global.CONFIGS.api.loginSuccess;
            data.userId = user._id;
            data.first_name = user.firstName;
            data.last_name = user.lastName;
            data.mobile = user.mobile;
            data.email = user.email;
            data.referral_code = user.referralCode;
            data.Gender = user.gender;
            data.Profile_pic = user.avatar;


          } else {

            data.responseCode = global.CONFIGS.responseCode.error
            data.responseMessage = global.CONFIGS.api.loginFail;
          }
          res.send(data);
        }).catch(err => {
          console.log("error", err)

          data.responseCode = global.CONFIGS.responseCode.exception
          data.responseMessage = global.CONFIGS.api.loginFail;
          res.status(data.responseCode).send(data);
        });
      } else {
        data.responseCode = global.CONFIGS.responseCode.notFoud
        data.responseMessage = global.CONFIGS.api.userNotFound;
        res.status(data.responseCode).send(data);
      }
    });


  },

  getUserDetails: function (req, res, next) {
    const { userId } = req.body;
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "name": "",
      "mobile": "",
      "email": "",
      "profile_image": "",
      "vehicle_type": "",
      "brand": "",
      "vehicle_number": "",
      "model": "",
      "year": "",
      "color": "",
      "address": "",
      "country": "",
      "state": "",
      "pincode": "",
    }
    UserModel.findOne({ "_id": userId }, (err, user) => {
      console.log("user", user)
      if (!err && user) {

        vehicleModel.findOne({ driverId: user._id }).populate({ path: 'vehicleBrandId', model: constants.VehicleBrandModel }).populate({ path: 'vehicleModelId', model: constants.VehicleModelModel }).then((vehicle) => {
          if (!vehicle) {
            console.log("vehicle", vehicle)
            data.responseCode = global.CONFIGS.responseCode.error
            data.responseMessage = global.CONFIGS.api.getUserDetailsFail;
            res.status(data.responseCode).send(data);
          } else {
            console.log("users", user);
            console.log("vehicle", vehicle);
            data.name = user.fullname;
            data.mobile = user.moile;
            data.email = user.email;
            data.profile_image = user.avatar;
            data.vehicle_type = vehicle.vehicleModelId.vehicleType;
            data.brand = vehicle.vehicleBrandId.vehicleBrandName;
            data.vehicle_number = vehicle.vehicleNumber;
            data.model = vehicle.vehicleModelId.vehicleModelName;
            data.year = vehicle.vehicleYear;
            data.color = vehicle.vehicleColor;
            data.address = user.address;
            data.country = user.country;
            data.state = user.state;
            data.pincode = user.pincode;

            data.responseMessage = global.CONFIGS.api.getUserDetailsSuccess;
            res.status(data.responseCode).send(data);
          }
        });

      } else {
        data.responseCode = global.CONFIGS.responseCode.notFoud
        data.responseMessage = global.CONFIGS.api.userNotFound;
        res.status(data.responseCode).send(data);
      }
    })
  },


  driverWaller: function (req, res, next) {
    const { userId } = req.body;
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "Total_wallet_balance": 0,
      "total_rides": 200,
      "online_hours": 0,
      "total_distance_covered": 0,
      "earning": 0,
      "ride_earning": 0,
    }
    UserModel.findOne({ "_id": userId }, (err, user) => {
      console.log("user", user)
      if (!err && user) {


        data.Total_wallet_balance = user.walletBalance;
        data.total_rides = 200;
        data.online_hours = user.onlineMinutes;
        data.total_distance_covered = user.totalDistance;
        data.earning = user.earning;
        data.ride_earning = user.Earning;
       

        data.responseMessage = global.CONFIGS.api.getUserDetailsSuccess;
        res.status(data.responseCode).send(data);


      } else {
        data.responseCode = global.CONFIGS.responseCode.notFoud
        data.responseMessage = global.CONFIGS.api.userNotFound;
        res.status(data.responseCode).send(data);
      }
    })
  },



  verifyOtpApi: function (req, res, next) {
    const { mobile, otp, device_id, deviceType } = req.body;

    console.log("data", req.body)
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "userId": "",
      "sessionToken": "",
      "first_name": "",
      "last_name": "",
      "mobile": "",
      "email": "",
      "referral_code": "",
      "Gender": "",
      "Profile_pic": "",
    }

    try {
      UserModel.find({ mobile: mobile, verifiyMobileOtp: otp }).then((response) => {
        if (response.length > 0) {

          UserModel.updateOne({ mobile: mobile }, {
            $set: {
              isMobileVerified: 1,
            }
          }, (err, result) => {
            if (err) {
              data.responseCode = global.CONFIGS.responseCode.error
              data.responseMessage = global.CONFIGS.api.verifyOtpFail;
              res.send(data)
            } else {
              console.log("response", response)
              const payload = { mobile: response.mobile };
              const options = { expiresIn: '1d', issuer: 'rumble' };
              const secret = process.env.SECRETKEY;
              const token = jwt.sign(payload, secret, options);
              data.sessionToken = token;
              data.responseMessage = global.CONFIGS.api.verifyOtp;
              data.userId = response[0]._id;
              data.first_name = response[0].firstName;
              data.last_name = response[0].lastName;
              data.mobile = response[0].mobile;
              data.email = response[0].email;
              data.referral_code = response[0].referralCode;
              data.Gender = response[0].gender;
              data.Profile_pic = response[0].avatar;
              res.send(data)
            }
          });


        } else {
          data.responseCode = global.CONFIGS.responseCode.error
          data.responseMessage = global.CONFIGS.api.verifyOtpFail;
          res.send(data)

        }

      });
    } catch (exp) {

      console.log(exp);
      data.responseCode = global.CONFIGS.responseCode.exception;

      res.status(data.responseCode).send(data)
    }


  },

  sendOtpApi: function (req, res, next) {

    const { mobile, user_type } = req.body;
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "otp": ""
    }
    UserModel.findOne({ "mobile": mobile, userRole: user_type }, (err, user) => {
      console.log("user", user)
      if (!err && user) {
        const OTP = randomstring.generate({ length: 4, charset: 'numeric' })
        UserModel.updateOne({ mobile: mobile }, {
          $set: {
            verifiyMobileOtp: OTP,
          }
        }, (err, result) => {
          if (err) {

            data.responseCode = global.CONFIGS.responseCode.error
            data.responseMessage = global.CONFIGS.api.sendOtpFail;
            res.status(data.responseCode).send(data);
          } else {
            data.otp = OTP
            data.responseMessage = global.CONFIGS.api.sendOtpSuccess;
            res.status(data.responseCode).send(data);
          }
        });

      } else {
        data.responseCode = global.CONFIGS.responseCode.notFoud
        data.responseMessage = global.CONFIGS.api.userNotFound;
        res.status(data.responseCode).send(data);
      }
    })

  },

  forgetPasswordApi: function (req, res, next) {

    const { mobile, user_type } = req.body;
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "otp": ""
    }
    UserModel.findOne({ "mobile": mobile, userRole: user_type }, (err, user) => {
      console.log("user", user)
      if (!err && user) {
        const OTP = randomstring.generate({ length: 4, charset: 'numeric' })
        UserModel.updateOne({ mobile: mobile }, {
          $set: {
            verifiyMobileOtp: OTP,
          }
        }, (err, result) => {
          if (err) {

            data.responseCode = global.CONFIGS.responseCode.error
            data.responseMessage = global.CONFIGS.api.sendOtpFail;
            res.status(data.responseCode).send(data);
          } else {
            data.otp = OTP
            data.responseMessage = global.CONFIGS.api.sendOtpSuccess;
            res.status(data.responseCode).send(data);
          }
        });

      } else {
        data.responseCode = global.CONFIGS.responseCode.notFoud
        data.responseMessage = global.CONFIGS.api.userNotFound;
        res.status(data.responseCode).send(data);
      }
    })
  },

  changePasswordApi: function (req, res, next) {

    const { mobile, password, otp } = req.body;
    console.log("req", req.body)
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",

    }
    UserModel.findOne({ mobile: mobile, verifiyMobileOtp: otp })
      .then((result) => {
        console.log("result", result)
        if (result) {


          bcrypt.genSalt(10, (err, salt) => {
            if (err) {

              console.log("1", err)
              data.responseCode = global.CONFIGS.responseCode.error
              data.responseMessage = global.CONFIGS.api.changePasswordFail;
              res.send(data);
            } else {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) {

                  console.log("2", err)
                  data.responseCode = global.CONFIGS.responseCode.error
                  data.responseMessage = global.CONFIGS.api.changePasswordFail;
                  res.send(data);
                } else {

                  UserModel.updateOne({ mobile: mobile }, {
                    $set: {

                      password: hash,

                    }
                  }, (err, result) => {
                    if (err) {

                      console.log("3", err)
                      data.responseCode = global.CONFIGS.responseCode.error
                      data.responseMessage = global.CONFIGS.api.changePasswordFail;
                      res.send(data);
                    } else {

                      data.responseMessage = global.CONFIGS.api.changePasswordSuccess;
                      res.status(data.responseCode).send(data);
                    }
                  });
                }
              });
            }
          });
        }
        else {
          data.responseCode = global.CONFIGS.responseCode.error
          data.responseMessage = global.CONFIGS.api.changePasswordFail;
          res.send(data);

          // generate hash

        }
      })

  },

  registerUserApi: function (req, res, next) {
    const { vehicleNumber, vehicleYear, vehicleColor, aadharCardNumber } = req.body;

    console.log("filename", req.files);

    var Profile_pic = 'Profile_pic' in req.files && req.files.Profile_pic.length ? 'uploads/' + req.files.Profile_pic[0].filename : "";
    var drivingLicenceFront = 'drivingLicenceFront' in req.files && req.files.drivingLicenceFront.length ? 'uploads' + req.files.drivingLicenceFront[0].filename : "";
    var drivingLicenceBack = 'drivingLicenceBack' in req.files && req.files.drivingLicenceBack.length ? 'uploads/' + req.files.drivingLicenceBack[0].filename : "";
    var motorInsuranceCertificate = 'motorInsuranceCertificate' in req.files && req.files.motorInsuranceCertificate.length ? 'uploads/' + req.files.motorInsuranceCertificate[0].filename : "";
    var vehicleCarriagePermit = 'vehicleCarriagePermit' in req.files && req.files.vehicleCarriagePermit.length ? 'uploads/' + req.files.vehicleCarriagePermit[0].filename : "";
    var aadharCardFront = 'aadharCardFront' in req.files && req.files.aadharCardFront.length ? 'uploads/' + req.files.aadharCardFront[0].filename : "";
    var aadharCardBack = 'aadharCardBack' in req.files && req.files.aadharCardBack.length ? 'uploads/' + req.files.aadharCardBack[0].filename : "";
    var policeVerification = 'policeVerification' in req.files && req.files.policeVerification.length ? 'uploads/' + req.files.policeVerification[0].filename : "";


    console.log("vehile number", vehicleNumber)
    const OTP = randomstring.generate({ length: 4, charset: 'numeric' })
    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",

    }

    console.log("requeset", req.body)


    UserModel.findOne({ $or: [{ phoneNumber: req.body.mobile }, { email: req.body.email }] })
      .then((result) => {
        var OTP = randomstring.generate({ length: 4, charset: 'numeric' });

        if (result) {

          data.responseCode = global.CONFIGS.responseCode.error
          data.responseMessage = global.CONFIGS.api.registerFail;
          res.send(data)
        }
        else {
          // generate hash
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              data.responseCode = global.CONFIGS.responseCode.error
              data.responseMessage = global.CONFIGS.api.registerFail;
              res.send(data)
            } else {
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                  data.responseCode = global.CONFIGS.responseCode.error
                  data.responseMessage = global.CONFIGS.api.registerFail;
                  res.send(data)
                } else {

                  // save data in db
                  UserModel.create({
                    avatar: Profile_pic,
                    firstName: req.body.first_name,
                    lastName: req.body.last_name,
                    countryCode: '+91',
                    mobile: req.body.mobile,
                    email: req.body.email,
                    userRole: req.body.user_type,
                    password: hash,
                    gender: req.body.Gender,
                    referralCode: req.body.referral_code,
                    verifiyEmailToken: randomstring.generate({ length: 12, charset: 'alphanumeric' }),
                    verifiyMobileOtp: OTP,
                    expTime: new moment().add(10, 'minutes').toDate(),
                    acceptTNC: req.body.acceptTNC,
                  }, (err, result) => {
                    if (err) {

                      data.responseCode = global.CONFIGS.responseCode.error
                      data.responseMessage = global.CONFIGS.api.registerFail;
                      res.send(data)
                    } else {

                      var DriverIdNew = result._id
                      UserModel.findOne({ $or: [{ phoneNumber: req.body.mobile }, { email: req.body.email }] }).then((result) => {
                        if (result) {
                          console.log("result1", result)

                          var vehicleBrandId = new VehicleBrandModel({
                            _id: req.body.vehicleBrand
                          });
                          var vehicleModelId = new VehicleModelModel({
                            _id: req.body.vehicleModel
                          });
                          // var vehicleTypeId = new VehicleTypeModel({
                          //   _id: req.body.vehicleType
                          // });

                          vehicleModel.create({
                            activeStatus: "1",
                            driverId: DriverIdNew,
                            vehicleBrandId: vehicleBrandId,
                            vehicleModelId: vehicleModelId,
                            vehicleType: req.body.vehicleType,
                            vehicleNumber: vehicleNumber,
                            vehicleYear: vehicleYear,
                            vehicleColor: vehicleColor,
                            vehicleCapacity: 200,
                            verifiyEmailToken: randomstring.generate({ length: 12, charset: 'alphanumeric' }),
                            verifiyMobileOtp: randomstring.generate({ length: 4, charset: 'numeric' }),
                            expTime: new moment().add(10, 'minutes').toDate(),

                          }, (err, result) => {
                            console.log("result", result)

                            DriverMetaModel.create({
                              aadharNumber: aadharCardNumber,
                              driverId: DriverIdNew,
                              aadharFront: aadharCardFront,
                              aadharBack: aadharCardBack,
                              dlFront: drivingLicenceFront,
                              dlBack: drivingLicenceBack,
                              motorIns: motorInsuranceCertificate,
                              carriagePermit: vehicleCarriagePermit,
                              policeVerifyPermit: policeVerification
                            }, (err, result) => {
                              if (err) {
                                console.log("error", err)
                                data.responseCode = global.CONFIGS.responseCode.error
                                data.responseMessage = global.CONFIGS.api.registerFail;
                                res.send(data)
                              } else {


                                data.responseCode = global.CONFIGS.responseCode.success
                                data.responseMessage = global.CONFIGS.api.registerSuccess;
                                data.otp = OTP
                                res.send(data)
                              }
                            });

                          });



                        } else {

                          data.responseCode = global.CONFIGS.responseCode.error
                          data.responseMessage = global.CONFIGS.api.registerFail;
                          res.send(data)
                        }
                      })

                    }
                  });
                }
              });
            }
          });
        }
      })

  },

  edit_driver_details: function (req, res, next) {
    const { userId, name, mobile, email, password } = req.body;

    console.log("filename", req.files);

    var Profile_pic = 'Profile_pic' in req.files && req.files.Profile_pic.length ? 'uploads/' + req.files.Profile_pic[0].filename : "";


    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",

    }

    console.log("requeset", req.body)


    try {

      UserModel.findOne({ _id: userId })
        .then((result) => {

          if (!result) {

            data.responseCode = global.CONFIGS.responseCode.error
            data.responseMessage = global.CONFIGS.api.userNotFound;
            res.send(data)
          }
          else {
            // generate hash
            bcrypt.genSalt(10, (err, salt) => {
              if (err) {
                data.responseCode = global.CONFIGS.responseCode.error
                data.responseMessage = global.CONFIGS.api.edit_driver_detailsFail;
                res.send(data)
              } else {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                  if (err) {
                    data.responseCode = global.CONFIGS.responseCode.error
                    data.responseMessage = global.CONFIGS.api.edit_driver_detailsFail;
                    res.send(data)
                  } else {

                    let arrFullName = req.body.name.split(' ');
                    let lastName = ""
                    let firstName = lastName = '';
                    if (arrFullName.length === 1) {
                      firstName = arrFullName[0];
                    } else {
                      firstName = req.body.name.split(' ').slice(0, -1).join(' ');
                      lastName = req.body.name.split(' ').slice(-1).join(' ');
                    }
                    // save data in db
                    UserModel.updateOne({ _id: userId }, {
                      $set: {
                        firstName: firstName,
                        lastName: lastName,
                        mobile: mobile,
                        email: email,
                        avatar: Profile_pic,
                        password: hash,

                      }
                    }, (err, result) => {
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
                });
              }
            });
          }
        })

    }
    catch (ex) {
      data.responseCode = global.CONFIGS.responseCode.error
      data.responseMessage = global.CONFIGS.api.userNotFound;
      res.send(data)
    }
  },

  getDetails: function (req, res, next) {
    const { userId, Lat, Long, is_driver_avaliable } = req.body;


    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",
      "driver_name": "",
      "driver_id": "",
      "total_rides": "",
      "total_income": "",
      "driver_image": "",
      "is_driver_avaliable": "",
      "online_hours": ""


    }

    console.log("requeset", req.body)

    function calculateMinutes(startDate, endDate) {
      var start_date = moment(startDate, 'YYYY-MM-DD HH:MM');
      var end_date = moment(endDate, 'YYYY-MM-DD HH:MM');
      var duration = moment.duration(end_date.diff(start_date));
      var minutes = parseInt(duration.asMinutes());
      return minutes;
    }

    try {

      UserModel.findOne({ _id: userId })
        .then((result) => {

          if (!result) {
            data.responseCode = global.CONFIGS.responseCode.error
            data.responseMessage = global.CONFIGS.api.userNotFound;
            res.send(data)
          }
          else {
            data.driver_name = result.fullName;
            data.driver_id = userId;
            data.total_income = result.rideEarning;
            data.total_rides = 200;
            data.online_hours = 0;
            data.driver_image = result.avatar;
            data.is_driver_avaliable = is_driver_avaliable;
            var onlineTimeNew = "";
            var totalMinutes = result.onlineMinutes;
            //console.log("resDate", moment(result.onlineTime).format('MMMM Do YYYY HH:MM'))
            //if previously it was offline and if he is changing status then dont count minutes 
            if (result.userOnline) {
              if (result.onlineTime != null) {
                totalMinutes += calculateMinutes(result.onlineTime, new Date)
                console.log("totalMinutes", totalMinutes)
                if (totalMinutes >= 0) {
                  totalMinutes = totalMinutes
                }
              }
            }
            if (is_driver_avaliable) {
              console.log("here", new Date())
              onlineTimeNew = new Date()
            }
            // save data in db
            UserModel.updateOne({ _id: userId }, {
              $set: {
                driverLat: Lat,
                driverLong: Long,
                userOnline: is_driver_avaliable,
                onlineTime: onlineTimeNew,
                onlineMinutes: totalMinutes,


              }
            }, (err, result) => {
              if (err) {
                console.log("printerror", err)
                data.responseCode = global.CONFIGS.responseCode.error
                data.responseMessage = global.CONFIGS.api.getDetailsFail;
                res.send(data)
              } else {
                data.online_hours = totalMinutes
                data.responseCode = global.CONFIGS.responseCode.success
                data.responseMessage = global.CONFIGS.api.getDetailsSuccess;
                res.send(data)
              }
            });
          }
        })
    }
    catch (ex) {
      data.responseCode = global.CONFIGS.responseCode.error
      data.responseMessage = global.CONFIGS.api.userNotFound;
      res.send(data)
    }
  },

  update_profile: function (req, res, next) {
    const { userId, name, mobile, email, address, country, state, pincode } = req.body;



    var data = {
      "responseCode": global.CONFIGS.responseCode.success,
      "responseMessage": "",

    }

    console.log("requeset", req.body)


    try {

      UserModel.findOne({ _id: userId })
        .then((result) => {

          if (!result) {

            data.responseCode = global.CONFIGS.responseCode.error
            data.responseMessage = global.CONFIGS.api.userNotFound;
            res.send(data)
          }
          else {
            // generate hash
            let arrFullName = req.body.name.split(' ');
            let lastName = ""
            let firstName = lastName = '';
            if (arrFullName.length === 1) {
              firstName = arrFullName[0];
            } else {
              firstName = req.body.name.split(' ').slice(0, -1).join(' ');
              lastName = req.body.name.split(' ').slice(-1).join(' ');
            }

            UserModel.updateOne({ _id: userId }, {
              $set: {
                firstName: firstName,
                lastName: lastName,
                mobile: mobile,
                email: email,
                address: address,
                country: country,
                state: state,
                pincode: pincode

              }
            }, (err, result) => {
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
      data.responseCode = global.CONFIGS.responseCode.error
      data.responseMessage = global.CONFIGS.api.userNotFound;
      res.send(data)
    }
  },


>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
};

module.exports = usersFunctions;