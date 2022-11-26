// const Blog = require('../models/blog.js') ;
const mongoose = require("mongoose");
// const db = require("./models");
const Cart = require('../models/cart.js')
const Product = require('../models/product.js');
const { response } = require("express");

const difference = (A, B) => {
    const arrA = Array.isArray(A) ? A.map(x => x.toString()) : [A.toString()];
    const arrB = Array.isArray(B) ? B.map(x => x.toString()) : [B.toString()];
  
    const result = [];
    for (const p of arrA) {
      if (arrB.indexOf(p) === -1) {
        result.push(p);
      }
    }
  
    return result;
  }

const getCart =(req, res, next) => {
    Cart.find().then(
        response => {
            res.json({
                status_code:res.statusCode,
                message:'Success',
                data:response
            })}).catch(err => {
            res.json({
                status_code:res.statusCode,
                message:'An error occurred'
            })
    })

  

}

//add new Cart
const createCart = async (req, res, next) => {
    let msg = '';
    let {cart} = req.body;
    
    let newCart = await Cart.create(cart);
    console.log(newCart);
    await Cart.updateMany({"_id": newCart.products}, {$push:{carts: newCart._id}});

    return res.send({
        status_code:res.statusCode,
        message:msg,
        data: newCart
    });
}


const updateCart = async (req, res, next) => {

    let _id = mongoose.Types.ObjectId(req.params.id);
    
    let { cart } = req.body;
    // console.log(`product: ${product}`);  
    let newProducts = cart.products;
    // console.log(`new tag: ${newProducts}`);  
    let oldCart = await Cart.findOne({ _id: _id });
    // console.log(oldCart);
    
    let oldProducts = oldCart.products;
    //  console.log(`old prod: ${oldProducts}`);  

    Object.assign(oldCart, cart);
     let newCart = await oldCart.save();
  

     let added = difference(newProducts, oldProducts);
     let removed = difference(oldProducts, newProducts);
     console.log(JSON.stringify(added));
    //  const test = await Product.updateMany({ '_id': added }, { $addToSet: { cart: cart._id } });
    //  console.log(test);
    //  await Product.updateMany({ '_id': removed }, { $pull: { carts: cart._id } });
  
     return res.send(newCart);
}



const deleteCart = async (req, res, next) => {
    // let status_code = 200;
    let msg ='';
    let _id = mongoose.Types.ObjectId(req.params.id);
    console.log(`id: ${_id}`);
    // let tutorial = await Tutorial.findOne({_id});
    const cart= await Cart.findById(_id);

   await Cart.findByIdAndDelete(_id).then(()=>{
        res.json({
            status_code:res.statusCode,
            message:'Cart delete successfully',
        
        })
    }).catch(error=>{
        res.json({
            statusCode:res.statusCode,
            message:'An error occurred'
        })
    });
    //  console.log(`tutorial: ${tutorial}`);
    await Product.updateMany({"_id": cart._id}, {$pull:{carts:cart._id}});

    return res;

}



module.exports = {
    getCart, createCart, updateCart,deleteCart
}

