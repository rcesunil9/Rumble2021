<<<<<<< HEAD
var express = require('express');

//var ratingReview_C = require("../controllers/api/RatingApi");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('pages/dashboard');
});



// router.post("/rating/add", ratingReview_C.addPost);
// router.post("/rating/addDriver", ratingReview_C.addPostDriver);
module.exports = router;
=======

var express = require('express');
var ratingReview_C = require("../controllers/api/RatingApi");
var user_C = require("../controllers/Users_C");
var vehicle_MC = require("../controllers/Vechile_MC");
var booking_C = require("../controllers/Booking_C");
var ticket_C = require("../controllers/Ticket_C");
var { validToken, apiValidateToken } = require("../middlewares/authenticators/apiAuthHandlers");
var notification_C = require("../controllers/Notification_C");
var Membership_C = require("../controllers/Membership_C");

var router = express.Router();

var multer = require('multer');
const localStorage = multer.diskStorage({
  destination: (req, res, next) => {
    next(null, global.CONFIGS.uploadPath)
  },
  filename: (req, file, next) => {
    next(null, Date.now() + '-' + file.originalname)
  }
});
var upload = multer({ storage: localStorage});
/* GET home page. */
var cpUpload = upload.fields([
  { name: 'Profile_pic', maxCount: 1 },
  { name: 'drivingLicenceFront', maxCount: 1 },
  { name: 'drivingLicenceBack', maxCount: 1 },
  { name: 'motorInsuranceCertificate', maxCount: 1 },
  { name: 'vehicleCarriagePermit', maxCount: 1 },
  { name: 'aadharCardFront', maxCount: 1 },
  { name: 'aadharCardBack', maxCount: 1 },
  { name: 'policeVerification', maxCount: 1 }
])

router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('pages/dashboard');
});
router.post("/user/login", user_C.loginApi);
router.post("/user/verifyOtp", user_C.verifyOtpApi);
router.post("/user/registration", user_C.registrationApi);
router.post("/user/sendOtp", user_C.sendOtpApi);
router.post("/user/forgetPassword", user_C.forgetPasswordApi);
router.post("/user/changePassword", apiValidateToken, user_C.changePasswordApi);
router.post("/user/registrationApi", cpUpload, user_C.registerUserApi);
router.post("/user/edit_driver_details", cpUpload, user_C.edit_driver_details);
router.post("/user/getDetails", apiValidateToken, user_C.getDetails);
router.post("/user/update_profile", apiValidateToken, user_C.update_profile);


router.get("/vehicleBrands", vehicle_MC.vehicleBrandsApi);
router.post("/vehicleModel", vehicle_MC.vehicleModelApi);
router.post("/vehicleColor", vehicle_MC.vehicleColorApi);
router.post("/manage_vehicle", apiValidateToken, vehicle_MC.manage_vehicle);


router.post("/booking/ridesList", apiValidateToken, booking_C.bookingListApi);
router.post("/booking/ridesRequest", apiValidateToken, booking_C.requestBookingApi);


router.post("/notification/addNotification", apiValidateToken, notification_C.addNotificationApi);
router.post("/notification/notificationList", apiValidateToken, notification_C.notificationTypeListApi);


router.post("/membership/membershipList", apiValidateToken, Membership_C.membershipListApi);



router.get("/ticket/supportTypeList", ticket_C.supportTypeListApi);
router.post("/ticket/addSupportTicket",ticket_C.addSupporttypeApi);

router.post("/user/getUserDetails", apiValidateToken, user_C.getUserDetails);
router.post("/user/driverWallet", apiValidateToken, user_C.driverWaller);

router.post("/rating/add", ratingReview_C.addPost);
router.post("/rating/addDriver", ratingReview_C.addPostDriver);

module.exports = router;

>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
