const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const { saveRedirectUrl } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

const userController = require("../controllers/users.js");

// ================= SIGNUP =================
router
.route("/signup")
.get( userController.renderSignupForm)
.post(wrapAsync(userController.signup));

// ================= LOGIN =================
router
.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login", failureFlash: true, }), userController.login);

// ================= LOGOUT =================
router.route("/logout")
.get(userController.logout);

module.exports = router;