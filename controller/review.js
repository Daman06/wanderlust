const Listing=require("../models/listing");
const Review=require("../models/review")

module.exports.createReview=async(req,res)=>{
      
let listing=await Listing.findById(req.params.id);
 
// Ensure rating is a Number (avoid Joi/Mongoose validation errors when value comes as a string or array)
if(req.body && req.body.review && req.body.review.rating){
    req.body.review.rating = Number(req.body.review.rating);
}
let newReview =new Review(req.body.review);
newReview.author=req.user._id;
console.log(newReview);
listing.reviews.push(newReview);

await newReview.save();
await listing.save();
req.flash("success","New Review  created!");
    
res.redirect(`/listings/${listing._id}`);
};
module.exports.destroyReview=async(req,res)=>{
        let{id,reviewId}=req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
         await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!");
  
    res.redirect(`/listings/${id}`);
};