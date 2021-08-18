var express = require('express');
var router = express.Router();

var { webAuthenticated } = require("../middlewares/authenticators/webAuthHandlers");
var validationHandler = require("../middlewares/validators/validationHandlers");

var ratingReview_C = require("../controllers/RatingReview_C");

// ROUTES //
 router.get("/customer", webAuthenticated, ratingReview_C.viewSCustomer);
router.post("/listAjaxRCustomer", webAuthenticated, ratingReview_C.listAjaxRCustomer);
// router.post("/ticket/reply-customer", webAuthenticated, ticket_C.replyPostSCustomer);
// router.post("/ticket/status-customer", webAuthenticated, ticket_C.updateStatusSCustomer);

router.get("/driver", webAuthenticated, ratingReview_C.viewSDriver);
router.post("/listAjaxSDriver", webAuthenticated, ratingReview_C.listAjaxSDriver);
// router.post("/ticket/listAjax-driver", webAuthenticated, ticket_C.listAjaxSDriver);
// router.post("/ticket/reply-driver", webAuthenticated, ticket_C.replyPostSDriver);
// router.post("/ticket/status-driver", webAuthenticated, ticket_C.updateStatusSDriver);



module.exports = router;
