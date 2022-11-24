const Blog = require('../models/blog.js') ;




//add new employee
const store = (req, res, next) => {
 let blog = new Blog({
    name:req.body.name,
  author:req.body.author,


 })
 blog.save().then(response =>{
    res.json({message:'Blog Added Successfully'})
    }).catch(error=>{
    res.json({
        message:'Failed to add Blog'
    })
})

}


module.exports = {
    store
}

