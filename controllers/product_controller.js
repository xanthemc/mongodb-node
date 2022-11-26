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

const getProduct =(req, res, next) => {
    Product.find().then(
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
const getSingleProduct =async (req, res, next) => {
    let _id = mongoose.Types.ObjectId(req.params.id);
   /*  let product = await Product.findById(_id);

    return res.json({ 
        status_code:res.statusCode,
        message:'Success',
        data:product }); */
        Product.findById(_id).then(
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



//add new Product
const createProduct = async (req, res, next) => {
    let msg = '';
    let {product} = req.body;
    
    let newProduct = await Product.create(product);
    await Cart.updateMany({"_id": newProduct.carts}, {$push:{carts: newProduct._id}});

    return res.send({
        status_code:res.statusCode,
        message:msg,
        data: newProduct
    });
}

const updateProduct = async (req, res, next) => {

    let _id = mongoose.Types.ObjectId(req.params.id);
    
    let { product } = req.body;
    // console.log(`product: ${product}`);  
    let newCarts = product.carts;
    // console.log(`new tag: ${newTags}`);  
    let oldProduct = await Product.findOne({ _id: _id });
    let oldCarts = oldProduct.carts;
    // console.log(`old tag: ${oldTags}`);  

    Object.assign(oldProduct, product);
    let newProduct = await oldProduct.save();
    //  let added = difference(newCarts, oldCarts);
    //  let removed = difference(oldCarts, newCarts);
    // console.log(added, removed);
    // await Cart.updateMany({ '_id': added }, { $addToSet: { product: product._id } });
    // await Cart.updateMany({ '_id': removed }, { $pull: { product: product._id } });
  
     return res.send(
        {
            status_code:res.statusCode,
            data: newProduct
        }

     );
}



const deleteProduct = async (req, res, next) => {
    // let status_code = 200;
    let msg ='';
    let _id = mongoose.Types.ObjectId(req.params.id);
    console.log(`id: ${_id}`);
    // let tutorial = await Tutorial.findOne({_id});
    const product= await Product.findById(_id);

   await Product.findByIdAndDelete(_id).then(()=>{
        res.json({
            status_code:res.statusCode,
            message:'Product delete successfully',
        
        })
    }).catch(error=>{
        res.json({
            statusCode:res.statusCode,
            message:'An error occurred'
        })
    });
    //  console.log(`tutorial: ${tutorial}`);
    // await Cart.updateMany({"_id": product._id}, {$pull:{products:product._id}});

    return res;

}



module.exports = {
    getProduct,getSingleProduct, createProduct,updateProduct,deleteProduct
}

