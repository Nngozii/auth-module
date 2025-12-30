const Product = require("../models/product");
const User = require("../models/user");

exports.addProducts = (req, res, next) => {
  //res.sendFile(path.join(__dirname, "../", "views", "addProduct.html"));
  res.render("addProduct", { isAuthenticated: req.session.isLoggedIn });
};

exports.postAddProduct = (req, res, next) => {
  //const user = req.session.user._id
  //console.log(req.session.user._id)
  let prod = new Product({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
    userId: req.user,
  });
  prod
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.error({ message: err });
    });
};

exports.ProductList = async (req, res, next) => {
  //res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  const prods = await Product.find();
  res.render("admin/productList", {
    pro: prods,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getProducts = async (req, res, next) => {
  //res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  const prods = await Product.find();
  res.render("shop", { pro: prods, isAuthenticated: req.session.isLoggedIn });
};

exports.adminProduct = async (req, res, next) => {
  const prods = await Product.find();
  res.render("admin/adminProduct", {
    pro: prods,
    isAuthenticated: req.session.isLoggedIn,
    errorMessage: req.flash("error"),
  });
};

exports.productIndex = async (req, res, next) => {
  //const theId = req.params.id;
  //console.log("Category received", theId)
  const prods = await Product.findById(req.params.id);
  console.log("Product received", prods);
  res.render("shopProductDetails", {
    pro: prods,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", { isAuthenticated: req.session.isLoggedIn });
};
