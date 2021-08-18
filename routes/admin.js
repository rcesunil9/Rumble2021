var express = require('express');
var router = express.Router();

var { webAuthenticated, webNotAuthenticated } = require("../middlewares/authenticators/webAuthHandlers");
var validationHandler = require("../middlewares/validators/validationHandlers");

var users_C = require("../controllers/Users_C");

// ROUTES //
router.get("/", (req, res, next) => {
    res.redirect('/admin/login');
});

router.get("/login", webNotAuthenticated, users_C.loginIn);
router.post("/login", webNotAuthenticated, users_C.loginInPost);
router.get("/register", webNotAuthenticated, users_C.register);
router.post("/register", 
    [webNotAuthenticated, validationHandler.requestWebValidator(
        "body",
        validationHandler.registerSchema.Register.body)],
    users_C.registerPost);
router.get("/forgot-password", webNotAuthenticated, users_C.forgotPassword);
router.post("/forgot-password", webNotAuthenticated, users_C.forgotPassword);
//router.get("/recover-password", webNotAuthenticated, users_C.recoverPassword);
//router.post("/recover-password", webNotAuthenticated, users_C.recoverPasswordPost);
// router.get("/verify-mail", webNotAuthenticated, users_C.verifyEmail);
// router.post("/verify-mail", webNotAuthenticated, users_C.verifyEmailPost);

router.get("/dashboard", webAuthenticated, users_C.dashboard);

router.get("/logout", webAuthenticated, users_C.logout);

module.exports = router;
