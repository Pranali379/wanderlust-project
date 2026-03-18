const express = require("express");
const router = express.Router();

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); // add this



const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

// ================= INDEX & CREATE =================
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("image"), 
    wrapAsync(listingController.createListing) 
); // 👈 add this
    

// ================= NEW ROUTE =================
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ================= SHOW, UPDATE, DELETE =================
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn, isOwner,  upload.single("image"),  wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// ================= EDIT ROUTE =================
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;