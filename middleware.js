const Listing = require("./models/listing");
const Review = require("./models/review");

// ================= LOGIN CHECK =================
module.exports.isLoggedIn = (req, res, next) => {
    console.log("User:", req.user); // DEBUG
    console.log("Auth:", req.isAuthenticated()); // DEBUG

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // save where user wanted to go
        return res.redirect("/login");
    }
    next();
};

// ================= SAVE REDIRECT URL =================
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// ================= OWNER CHECK =================
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You're not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);

  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You're not the author of this listing");
    return res.redirect(`/listings/${id}`);
  }

  next();
};