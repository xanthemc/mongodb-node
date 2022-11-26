const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    brand: String,
    description: String,
    imageUrl: String,
    price: Number,
    carts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ]
    
}, {timestamps:true})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;