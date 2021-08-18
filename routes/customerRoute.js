var express = require('express');
var router = express.Router();

var { webAuthenticated, webNotAuthenticated } = require("../middlewares/authenticators/webAuthHandlers");
var validationHandler = require("../middlewares/validators/validationHandlers");

var customer_C = require("../controllers/Customer_C");

// ROUTES //
router.get("/list", webAuthenticated, customer_C.customerList);
router.post("/listAjax", webAuthenticated, customer_C.customerListAjax);
router.get("/list/download", webAuthenticated, customer_C.customerListDownload);

module.exports = router;
