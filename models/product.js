/*const products = [];

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
};*/

const mongoose = require("mongoose");

//const User = require('../models/user')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2017/01/06/22/59/sherlock-holmes-book-1959204_1280.jpg",
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type:String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model("Product", productSchema);
