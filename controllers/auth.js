const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
require("dotenv").config();
const crypto = require("crypto");

const User = require("../models/user");
const { err404 } = require("./404");

const api_key = process.env.SENDGRID_API_KEY;

const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: api_key,
    },
  })
);

//Take note of the return path after the person logs in. That is, the person should ne directed back to
//where he was and not just redirected to the home page after logging in

/* There's continue with whatsapp, google, facebook, email*/
exports.getSignUpForm = (req, res, next) => {
  //const returnPath = req.query.returnPath;
  //req.session.returnPath = returnPath;
  res.render("auth/signup", {
    isAuthenticated: false,
    errorMessage: req.flash("error"),
    oldInput: req.flash("oldInput")[0] || {},
  });
};

exports.getLoginForm = (req, res, next) => {
  const returnPath = req.query.returnPath;
  req.session.returnPath = returnPath;
  res.render("auth/login", {
    isAuthenticated: false,
    returnPath,
    errorMessage: req.flash("error"),
    oldInput: req.flash("oldInput")[0] || {},
  });
};

exports.postSignUp = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    let hashedPassword = await bcrypt.hash(password, 12);
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      let newUser = new User({
        email,
        password: hashedPassword,
        confirmPassword,
      });

      const savedUser = await newUser.save();
      console.log(`Saved User:${savedUser}`);

      await res.redirect("login");
      transporter
        .sendMail({
          to: email,
          from: "hexwhyzed01@gmail.com",
          subject: "Welcome To Node Shop",
          html: "<b>SignUp Successful</b>",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error({ MailError: err });
        });
    } else {
      req.flash("error", "User already exists");
      req.flash("oldInput", {
        email: req.body.email,
        password: "",
      });
      res.redirect("sign-up");
    }
  } catch (err) {
    console.error({ SignUpError: err });
  }
};

exports.postLogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    //let matchPassword = await bcrypt.compare(password, user.password);
    if (user) {
      let matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
          console.error({ redirectErrorMessage: err });
          res.redirect("/");
        });
      } else {
        req.flash("error", "Invalid Password");
        req.flash("oldInput", {
          email: req.body.email,
          password: "",
        });
        res.redirect("login");
      }
    } else {
      req.flash("error", "Invalid Email");
      req.flash("oldInput", {
        email: "",
        password: req.body.password,
      });
      res.redirect("login");
    }

    /*req.session.isLoggedIn = true;
    req.session.user = user;

    const redirectTo = returnPath || req.session.returnPath;
    console.log(`User logged in and redirected to ${redirectTo}`);
    delete req.session.returnPath;

    req.session.save((err) => {
      console.error({ redirectErrorMessage: err });
      res.redirect(redirectTo);
    });*/
  } catch (err) {
    console.error({ overallError: err });
  }
};

exports.ResetPassword = (req, res, next) => {
  res.render("auth/reset", {
    isAuthenticated: false,
    errorMessage: req.flash("error"),
  });
};

exports.PostResetPassword = async (req, res, next) => {
  try {
    const buffer = crypto.randomBytes(32);
    const token = buffer.toString("hex");

    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      user.resetToken = token;
      user.resetTokenExpiry = Date.now() + 1800000;
      await user.save();
      res.redirect("/");

      transporter
        .sendMail({
          to: email,
          from: "hexwhyzed01@gmail.com",
          subject: "Password Reset",
          html: `<b>You have requested for a password reset</b>
          <p>Click this link <a href="http://localhost:2026/auth/new-password/${token}">Reset Password<a/> to reset password</p>
          `,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error({ MailError: err });
        });
    } else {
      req.flash("error", "No Account With the Email Found");
      res.redirect("/auth/reset");
    }
  } catch (err) {
    console.error("Catch Overall Error", err);
  }
};

exports.newPassword = async (req, res, next) => {
  const token = req.params.token;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });
  if (!user) {
    req.flash("error", "Invalid or Expired Token");
    return res.redirect("/auth/reset");
  }
  res.render("auth/new-password", {
    isAuthenticated: false,
    errorMessage: req.flash("error"),
    userId: user._id,
    passwordToken: token,
  });
};

exports.PostNewPassword = async (req, res, next) => {
  try {
    const { password, userId, passwordToken } = req.body;
    const user = await User.findOne({
      _id: userId,
      resetToken: passwordToken,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (user) {
      let hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
      res.redirect("login");
    } else {
      req.flash("error", "Invalid or Expired Token");
      return res.redirect("/auth/reset");
    }
  } catch (err) {
    console.error("Post Password Error:", err);
  }
};

exports.postLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    console.error({ logoutErr: err });
    res.redirect("/");
  });
};
