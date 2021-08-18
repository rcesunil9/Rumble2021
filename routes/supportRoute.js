var express = require('express');
var router = express.Router();

var { webAuthenticated } = require("../middlewares/authenticators/webAuthHandlers");
var validationHandler = require("../middlewares/validators/validationHandlers");

var ticket_C = require("../controllers/Ticket_C");

// ROUTES //
router.get("/ticket/customer", webAuthenticated, ticket_C.viewSCustomer);
router.post("/ticket/listAjax-customer", webAuthenticated, ticket_C.listAjaxSCustomer);
router.post("/ticket/reply-customer", webAuthenticated, ticket_C.replyPostSCustomer);
router.post("/ticket/status-customer", webAuthenticated, ticket_C.updateStatusSCustomer);

router.get("/ticket/driver", webAuthenticated, ticket_C.viewSDriver);
router.post("/ticket/listAjax-driver", webAuthenticated, ticket_C.listAjaxSDriver);
router.post("/ticket/reply-driver", webAuthenticated, ticket_C.replyPostSDriver);
router.post("/ticket/status-driver", webAuthenticated, ticket_C.updateStatusSDriver);



module.exports = router;
