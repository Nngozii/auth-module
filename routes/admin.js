const express = require("express");

//const path = require("path");

const router = express.Router();

const proController = require("../controllers/products");
const productController = require("../controllers/editProduct");

const isAuth = require("../middlewares/is-auth");

router.get("/product", isAuth, proController.addProducts);

router.post("/products", proController.postAddProduct);

router.get("/products", proController.ProductList);

router.get("/admin-product", isAuth, proController.adminProduct);

router.get("/edit-product/:id", isAuth,  productController.getEditProduct);

router.post("/delete-product/:id", isAuth, productController.deleteProduct);

module.exports = router;
