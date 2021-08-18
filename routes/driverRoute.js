var express = require('express');
var router = express.Router();

var { webAuthenticated } = require("../middlewares/authenticators/webAuthHandlers");
var validationHandler = require("../middlewares/validators/validationHandlers");

var driver_C = require("../controllers/Driver_C");
<<<<<<< HEAD
=======
var driver_Map = require("../controllers/DriverList_Map");
var membership_C = require("../controllers/Membership_C");
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1

// ROUTES //
router.get("/list", webAuthenticated, driver_C.driverList);
router.post("/listAjax", webAuthenticated, driver_C.driverListAjax);
<<<<<<< HEAD
=======
router.get("/listMap", webAuthenticated, driver_Map.driverListMap);
router.get("/listMapData", webAuthenticated, driver_Map.ListAjax);
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
router.get("/list/download", webAuthenticated, driver_C.driverListDownload);

router.get("/view/:id", webAuthenticated, driver_C.view);
router.get("/add", webAuthenticated, driver_C.add);
router.post("/add",
    // [webAuthenticated, validationHandler.requestWebValidator("body", validationHandler.driverSchema.Driver.addBody)],
    driver_C.addPost);
router.get("/update/:id", driver_C.update);
router.post("/update/:id",
    // [webAuthenticated, validationHandler.requestWebValidator("body", validationHandler.driverSchema.Driver.updateBody)],
    driver_C.updatePost);

router.post("/brandmodel", webAuthenticated, driver_C.BrandModel);
router.post("/updateStatus", webAuthenticated, driver_C.updateuserStatus);
<<<<<<< HEAD
=======
router.get("/membership", webAuthenticated, membership_C.view );

router.post("/membership/listAjax", webAuthenticated, membership_C.ListAjax);

>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1


module.exports = router;
