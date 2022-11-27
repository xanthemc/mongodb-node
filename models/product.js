const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    brand: String,
    description: String,
    price: Number,
    
}, {timestamps:true})

const Product = mongoose.model('Product', productSchema);
// productSchema.index({ 'name': 'text' });

module.exports = Product;