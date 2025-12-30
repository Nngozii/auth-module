const Product = require("../models/product");

//This isn't working yet
exports.getEditProduct = async (req, res, next) => {
  try {
    const editMode = req.params.edit;
    if (!editMode) {
      return res.redirect("/");
    }
    const prods = await Product.findById(req.params.id);
    console.log("Product received", prods);
    //res.render("admin/adminProduct", { pro: prods });
    res.render("addProduct");
  } catch (err) {
    console.error({ message: err });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const prods = req.params.id;

    const user = await Product.findById(prods);
    const authorizedUser = user.userId;
    console.log("Authorized User:", authorizedUser);
    console.log("Logged User:", req.user)
    if (authorizedUser.equals(req.user)) { // or if (authorizedUser.toString() === req.user._id.toString()) 
      console.log(prods);
      await Product.findByIdAndDelete(prods);
      res.redirect("/admin-product");
    } else {
      req.flash("error", "You cannot delete this product");
      res.redirect("/admin-product");
    }
  } catch (err) {
    console.error({ message: err });
  }
};
