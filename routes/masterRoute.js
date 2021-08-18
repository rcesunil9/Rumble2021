var express = require('express');
var router = express.Router();

var { webAuthenticated } = require("../middlewares/authenticators/webAuthHandlers");
var validationHandler = require("../middlewares/validators/validationHandlers");

var vechile_MC = require("../controllers/Vechile_MC");
var coupon_MC = require("../controllers/Coupon_MC");
var membership_MC = require("../controllers/Membership_MC");
var referearn_MC = require("../controllers/Referearn_MC");
var pricecal_MC = require("../controllers/PriceCal_MC");
var ratingoptn_MC = require("../controllers/RatingOptn_MC");


// ROUTES //
router.get("/vechile", webAuthenticated, vechile_MC.view);
router.post("/vechile/listAjax-brand", webAuthenticated, vechile_MC.listAjaxBrand);
router.post("/vechile/add-brand", webAuthenticated, vechile_MC.addBrandPost);
router.post("/vechile/brand-status", webAuthenticated, vechile_MC.updateBrandStatus);
router.get("/vechile/brand/:id", webAuthenticated, vechile_MC.getBrandById);
router.post("/vechile/update-brand/:id", webAuthenticated, vechile_MC.updateBrandPost);

router.post("/vechile/listAjax-model", webAuthenticated, vechile_MC.listAjaxModel);
router.post("/vechile/add-model", webAuthenticated, vechile_MC.addModelPost);
router.post("/vechile/model-status", webAuthenticated, vechile_MC.updateModelStatus);
router.get("/vechile/model/:id", webAuthenticated, vechile_MC.getModelById);
router.post("/vechile/update-model/:id", webAuthenticated, vechile_MC.updateModelPost);

router.post("/vechile/listAjax-type", webAuthenticated, vechile_MC.listAjaxType);
router.post("/vechile/add-type", webAuthenticated, vechile_MC.addTypePost);
router.post("/vechile/type-status", webAuthenticated, vechile_MC.updateTypeStatus);
router.get("/vechile/type/:id", webAuthenticated, vechile_MC.getTypeById);
router.post("/vechile/update-type/:id", webAuthenticated, vechile_MC.updateTypePost);

<<<<<<< HEAD
=======
router.post("/vechile/listAjax-color", webAuthenticated, vechile_MC.listAjaxColor);
router.post("/vechile/add-color", webAuthenticated, vechile_MC.addColorPost);
 router.post("/vechile/color-status", webAuthenticated, vechile_MC.updateColorStatus);
router.get("/vechile/color/:id", webAuthenticated, vechile_MC.getColorById);
// router.post("/vechile/update-color/:id", webAuthenticated, vechile_MC.updateColorPost);

>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
router.get("/coupon", webAuthenticated, coupon_MC.view);
router.post("/coupon/listAjax", webAuthenticated, coupon_MC.listAjax);
router.post("/coupon/add", webAuthenticated, coupon_MC.addPost);
router.post("/coupon/status", webAuthenticated, coupon_MC.updateCouponStatus);
router.get("/coupon/:id", webAuthenticated, coupon_MC.getCouponById);
router.post("/coupon/update/:id", webAuthenticated, coupon_MC.updateCouponPost);

router.get("/membership", webAuthenticated, membership_MC.view);
router.post("/membership/listAjax", webAuthenticated, membership_MC.listAjax);
router.post("/membership/add", webAuthenticated, membership_MC.addPost);
router.post("/membership/status", webAuthenticated, membership_MC.updateMembershipStatus);
router.get("/membership/:id", webAuthenticated, membership_MC.getMembershipById);
router.post("/membership/update/:id", webAuthenticated, membership_MC.updateMembershipPost);

router.get("/refer-earn", webAuthenticated, referearn_MC.view);
router.post("/refer-earn/listAjax", webAuthenticated, referearn_MC.listAjax);
router.post("/refer-earn/add", webAuthenticated, referearn_MC.addPost);
router.post("/refer-earn/status", webAuthenticated, referearn_MC.updateEnRStatus);
router.get("/refer-earn/:id", webAuthenticated, referearn_MC.getEnRById);
router.post("/refer-earn/update/:id", webAuthenticated, referearn_MC.updateEnRPost);

router.get("/price-cal", webAuthenticated, pricecal_MC.view);
router.post("/price-cal/listAjax", webAuthenticated, pricecal_MC.listAjax);
router.post("/price-cal/add", webAuthenticated, pricecal_MC.addPost);
router.post("/price-cal/status", webAuthenticated, pricecal_MC.updatePriceCalStatus);
router.get("/price-cal/:id", webAuthenticated, pricecal_MC.getPriceCalById);
router.post("/price-cal/update/:id", webAuthenticated, pricecal_MC.updatePriceCalPost);

router.get("/rating-optn", webAuthenticated, ratingoptn_MC.view);
router.post("/rating-optn/listAjax", webAuthenticated, ratingoptn_MC.listAjax);
router.post("/rating-optn/add", webAuthenticated, ratingoptn_MC.addPost);
router.post("/rating-optn/status", webAuthenticated, ratingoptn_MC.updateRatingOptnStatus);
router.get("/rating-optn/:id", webAuthenticated, ratingoptn_MC.getRatingOptnById);
router.post("/rating-optn/update/:id", webAuthenticated, ratingoptn_MC.updateRatingOptnPost);




module.exports = router;
