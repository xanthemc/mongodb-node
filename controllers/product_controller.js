const mongoose = require("mongoose");
// const db = require("./models");
const Cart = require('../models/cart.js')
const Product = require('../models/product.js');
const { response } = require("express");



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
        if(!product) return res.status(404).json({ status_code:res.statusCode, message: 'Product not found' });
       return res.json({
            status_code:res.statusCode,
            message:'Success',
            data:product
        })

    }catch(err){
        res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });

    }
 
   
}


const getProductByName =async (req, res, next) => {

    const request = req.body.name;
    let result=[];
   
    try{
        let regex = new RegExp(`^${request}`, "i"); 
        result = await Product.find({ "name": regex })
        console.log(result);
        if(!(result.length)){
            
            return res.status(404).json({ status_code:res.statusCode, message: 'Product not found' });
        }


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
        if(!oldProduct) return res.status(404).json({ status_code:res.statusCode, message: 'Product not found' });
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
    

    try{
        const product= await Product.findByIdAndDelete(_id);
      
        if (!product) res.status(404).json({ status_code:res.statusCode, message: 'Product not found' });
        
    }catch(err){
        res.status(500).json({status_code:res.statusCode,  message: 'Something went wrong. Please try again later' });

    }
    return res.json({
        status_code:res.statusCode,
        message:'Product delete successfully',

    });

}



module.exports = {
    getProduct,getSingleProduct,getProductByName, createProduct,updateProduct,deleteProduct
}

