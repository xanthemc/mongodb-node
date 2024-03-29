

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    customerID:String,
  
     products: [
        {
          product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
          },
          quantity:String, //each product quantity in cart
        }
      ] 

    
}, {timestamps:true})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;