var mongoose = require('mongoose');
var constants = require('../../models/modelConstants');
var BookingRatingModel = mongoose.model(constants.BookingRatingModel);
//var DriverRatingModel = mongoose.model(constants.DriverRatingModel);
var userModel = mongoose.model(constants.UserModel);
var BookingConfirmedModel = mongoose.model(constants.BookingModel);
var RatingOptionModel = mongoose.model(constants.RatingOptionModel);

var Schema = mongoose.Schema;
var DriverRatingModel = mongoose.model("driverRating", new Schema(
    {

        driverId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: constants.UserModel,
            required: true
        },
        ratingStar: {
            type: Number,
            required: true
        },

    },
    {
        collection: constants.DriverRating,
        versionKey: false,
        autoIndex: false,
        timestamps: true
    }
)
);


let ratingApiFunctions = {

  

    addPost: async function (req, res, next) {
        console.log("request", req.body)
        let responseData = { status: 400, msg: "Something Went Wrong", field: "code" };
        let { validationError } = req;

        // validate request
        if (validationError != undefined && validationError) {
            responseData.msg = validationError;
            res.status(responseData.status).send(responseData);
        } else {
        
            var driverModel = new userModel({
                _id: req.body.driverId
            });

            var userModelNew = new userModel({
                _id: req.body.customerId
            });

            var BookingConfirmedModelNew = new BookingConfirmedModel({
                _id: req.body.bookingConfirmedId
            });

            var RatingOptionModelNew = new RatingOptionModel({
                _id:req.body.ratingOptionId
            })

            var rateDescOption = [];
            var ratingDesc1 = {
                type:RatingOptionModelNew._id
            }
            rateDescOption.push(RatingOptionModelNew._id)
           
            BookingRatingModel.findOne({ bookingConfirmedId: BookingConfirmedModelNew._id })
                .then((result) => {
                    if (result) {
                        responseData.msg = 'rating already given';
                        res.status(responseData.status).send(responseData);
                    }
                    else {
                        // save data in db
                        BookingRatingModel.create({
                            bookingConfirmedId: BookingConfirmedModelNew._id,
                            driverId: driverModel._id,
                            customerId: userModelNew._id,
                            ratingStar: req.body.ratingStar,
                            rateDescOption:rateDescOption,
                            rateDesc: req.body.rateDesc
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




    addPostDriver: async function (req, res, next) {
        console.log("request here", req.body)
        let responseData = { status: 400, msg: "Something Went Wrong", field: "code" };
        let { validationError } = req;

        // validate request
        if (validationError != undefined && validationError) {
            responseData.msg = validationError;
            res.status(responseData.status).send(responseData);
        } else {

            var driverModel = new userModel({
                _id: req.body.driverId
            });

            var userModelNew = new userModel({
                _id: req.body.customerId
            });

            var BookingConfirmedModelNew = new BookingConfirmedModel({
                _id: req.body.bookingConfirmedId
            });

           
           
            DriverRatingModel.findOne({ bookingConfirmedId: BookingConfirmedModelNew._id })
                .then((result) => {
                    if (result) {
                        responseData.msg = 'rating already given';
                        res.status(responseData.status).send(responseData);
                    }
                    else {
                        // save data in db
                        DriverRatingModel.create({
                            bookingConfirmedId: BookingConfirmedModelNew._id,
                            driverId: driverModel._id,
                            customerId: userModelNew._id,
                            ratingStar: req.body.ratingStar,
                            
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


  


};

module.exports = ratingApiFunctions;