
const mongoose = require("mongoose");
// const db = require("./models");
const Cart = require('../models/cart.js')
const Product = require('../models/product.js');
const { response } = require("express");



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
       
        let oldCart = await Cart.findOne({ _id: _id });
        if(!oldCart)return res.status(404).json({ status_code:res.statusCode, message: 'Cart not found' });
       

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
    
   
    try{
        const cart= await Cart.findByIdAndDelete(_id);
        
        if (!cart) return res.status(404).json({ status_code:res.statusCode, message: 'Cart not found' });
        
    }catch(err){
        res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });

    }
    return res.json({
        status_code:res.statusCode,
        message:'Cart delete successfully',

    });
        

}



module.exports = {
    getCart, createCart, updateCart,deleteCart
}

