const express=require("express");
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Review =require("../models/review.js")
const ExpressError=require("../utils/ExpressError.js");
const {validateReview,isLoggedIn}=require("./middleware.js");
const Listing=require("../models/listing.js");
const reviewController=require("../controller/review.js");


//POST review Router
router.post("/", isLoggedIn,validateReview ,wrapAsync(reviewController.createReview));

//Delete review route
router.delete("/:reviewId",
    wrapAsync(reviewController.destroyReview));
        
module.exports=router;






