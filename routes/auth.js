const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/auth");

router.get("/login", authController.getLoginForm);

router.get("/sign-up", authController.getSignUpForm);

router.post("/sign-up", body('confirmPassword').custom((value, {req}) => {
    // there's an error here. the account still get created even without password match
    if(value !== req.body.password) {
       return req.flash("error", "Passwords must match")
    }
}) ,authController.postSignUp);

router.post("/login", authController.postLogIn);

router.post("/log-out", authController.postLogOut);

router.get("/reset", authController.ResetPassword);

router.post("/reset", authController.PostResetPassword);

router.get("/new-password/:token", authController.newPassword)

router.post("/new-password", authController.PostNewPassword)

module.exports = router;
