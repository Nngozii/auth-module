const express = require("express");

//const path = require("path");

const router = express.Router();

const proController = require('../controllers/products')

const isAuth = require("../middlewares/is-auth");

router.get("/", proController.getProducts);

router.get("/product/:id", proController.productIndex);

//Will get back to you
router.get("/cart", isAuth, proController.getCart);

//router.get("/", proController.getProducts);

module.exports = router;
