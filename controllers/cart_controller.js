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
  console.log(`result: ${result}`);
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
                res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });
    })

  

}

//add new Cart
const createCart = async (req, res, next) => {
    let msg = '';
    let {cart} = req.body;
    let newCart =[];
    try{
         newCart = await Cart.create(cart);

    }catch(err){
        res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });
    }
   
    // console.log(newCart);
    // await Cart.updateMany({"_id": newCart.products}, {$push:{carts: newCart._id}});

    return res.send({
        status_code:res.statusCode,
        message:msg,
        data: newCart
    });
}


const updateCart = async (req, res, next) => {

    let _id = mongoose.Types.ObjectId(req.params.id);
    
    let { cart } = req.body;
    let newCart =[];
    try {
        // let newProducts = cart.products;
        // console.log(`new Prod: ${JSON.stringify(newProducts)}`);  
        let oldCart = await Cart.findOne({ _id: _id });
        if(!oldCart) res.status(404).json({ status_code:res.statusCode, message: 'Cart not found' });
        // let oldProducts = oldCart.products; 

        Object.assign(oldCart, cart);
        newCart = await oldCart.save();
    }
    catch (err) {
        res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });
    }

    return res.json({
        status_code:res.statusCode,
        message:'Success',
        data: newCart,

    })
}



const deleteCart = async (req, res, next) => {
    // let status_code = 200;
    let message =''; let status_code = 200;
    let _id = mongoose.Types.ObjectId(req.params.id);
    console.log(`id: ${_id}`);
    // let tutorial = await Tutorial.findOne({_id});
    try{
        const cart= await Cart.findByIdAndDelete(_id);
        // console.log(`cart: ${cart}`);
        if (!cart) res.status(404).json({ status_code:res.statusCode, message: 'Cart not found' });
        
    }catch(err){
        res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });

    }
    return res.json({
        status_code:res.statusCode,
        message:'Success',

    });
        
    


  /*  await Cart.findByIdAndDelete(_id).then(()=>{
        res.json({
            status_code:res.statusCode,
            message:'Cart delete successfully',
        
        })
    }).catch(error=>{
        res.json({
            statusCode:res.statusCode,
            message:'An error occurred'
        })
    }); */
    // await Product.updateMany({"_id": cart._id}, {$pull:{carts:cart._id}});

    // return res;

}



module.exports = {
    getCart, createCart, updateCart,deleteCart
}

