const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name:{
        type:String,
    },
    author:{
        type:String,
    },
   
    
}, {timestamps:true})

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;