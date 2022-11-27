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
                res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });
    })
}
const getSingleProduct =async (req, res, next) => {
    let _id = mongoose.Types.ObjectId(req.params.id);

    try{
        let product = await Product.findById(_id);
        if(!product) res.status(404).json({ status_code:res.statusCode, message: 'Product not found' });
       return res.json({
            status_code:res.statusCode,
            message:'Success',
            data:product
        })

    }catch(err){
        res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });

    }
 
    /*     Product.findById(_id).then(
        response => {
            
            res.json({
                status_code:res.statusCode,
                message:'Success',
                data:response
            })}).catch(err => {
                res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });
    })  */
}


const getProductByName =async (req, res, next) => {

    const request = req.body.name;
    let result;
   
    try{
        let regex = new RegExp(`^${request}`, "i"); 
        result = await Product.find({ "name": regex })
        console.log(result);
        // if(result.length==0) {res.status(404).json({ status_code:res.statusCode, message: 'Product not found' });}
        // const test = await Product.find( { name: { $regex: /^Probiotics/i } } )


    }catch(e){
        res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });
    }

return res.json({
    status_code:res.statusCode,
    message:'Success',
    data:result
});
   
}



//add new Product
const createProduct = async (req, res, next) => {
    let msg = '';
    let {product} = req.body;
    let newProduct=[]
    try {
         newProduct = await Product.create(product);

        // await Cart.updateMany({"_id": newProduct.carts}, {$push:{carts: newProduct._id}});
    }catch(err) {
        res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });
    }

    return res.send({
        status_code:res.statusCode,
        message:'Success',
        data: newProduct
    });
}

const updateProduct = async (req, res, next) => {

    let _id = mongoose.Types.ObjectId(req.params.id);
    console.log(`id: ${_id}`);
    let { product } = req.body;
    // let newCarts = product.carts;
    let newProduct=[]
    try {
        let oldProduct = await Product.findOne({ _id: _id });
        if(!oldProduct) res.status(404).json({ status_code:res.statusCode, message: 'Product not found' });
        Object.assign(oldProduct, product);
         newProduct = await oldProduct.save();
    }catch(e) {
        res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });
    }
  
    return res.send(
    {
        status_code:res.statusCode,
        message:'Success',
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

    try{
        const product= await Product.findByIdAndDelete(_id);
        // console.log(`cart: ${product}`);
        if (!product) res.status(404).json({ status_code:res.statusCode, message: 'Product not found' });
        
    }catch(err){
        res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });

    }
    return res.json({
        status_code:res.statusCode,
        message:'Success',

    });
  /*  await Product.findByIdAndDelete(_id).then(()=>{
        res.json({
            status_code:res.statusCode,
            message:'Product delete successfully',
        
        })
    }).catch(error=>{
        res.json({
            statusCode:res.statusCode,
            message:'An error occurred'
        })
    }); */
    //  console.log(`tutorial: ${tutorial}`);
    // await Cart.updateMany({"_id": product._id}, {$pull:{products:product._id}});

    // return res;

}



module.exports = {
    getProduct,getSingleProduct,getProductByName, createProduct,updateProduct,deleteProduct
}

