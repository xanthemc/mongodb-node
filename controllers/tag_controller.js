// const Blog = require('../models/blog.js') ;
const mongoose = require("mongoose");
// const db = require("./models");
const Tutorial = require('../models/tutorial.js')
const Tag = require('../models/tag.js');
const { response } = require("express");



const getTag =(req, res, next) => {
    Tag.find().then(
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

   /*  let result =  await Tutorial.find();

    return res.json({
        status_code:status_code,
        data: result
    }); */
    

}

//add new tutorial
const createTag = async (req, res, next) => {
    let msg = '';
    let {tag} = req.body;
    
    let newTag = await Tag.create(tag);
    await Tag.updateMany({"_id": newTag.tutorials}, {$push:{tags: newTag._id}});

    return res.send({
        status_code:res.statusCode,
        message:msg,
        data: newTag
    });
}

const updateTag = async (req, res, next) => {

    let _id = mongoose.Types.ObjectId(req.params.id);
    console.log(_id);  
    let { tag } = req.body;
    let newTutorials = tag.tutorials || [];
  
    let oldTag = await Tag.findById({ _id });
    let oldTutorials = oldTag.tutorials;
  
    Object.assign(oldTag, tag);
    let newTag = await oldTag.save();
  
    // let added = difference(newTutorials, oldTutorials);
    // let removed = difference(oldTutorials, newTutorials);
    // console.log(added, removed);
    // await Tag.updateMany({ '_id': added }, { $addToSet: { tutorials: foundTutorial._id } });
    // await Tag.updateMany({ '_id': removed }, { $pull: { tutorials: foundTutorial._id } });
  
     return res.send(newTag);
}


const deleteTag = async (req, res, next) => {
    // let status_code = 200;
    let msg ='';
    let _id = mongoose.Types.ObjectId(req.params.id);
    console.log(`id: ${_id}`);
    // let tutorial = await Tutorial.findOne({_id});
    const tag= await Tag.findById(_id);

   await Tag.findByIdAndDelete(_id).then(()=>{
        res.json({
            status_code:res.statusCode,
            message:'Tag delete successfully',
        
        })
    }).catch(error=>{
        res.json({
            statusCode:res.statusCode,
            message:'An error occurred'
        })
    });
    //  console.log(`tutorial: ${tutorial}`);
    await Tutorial.updateMany({"_id": tag._id}, {$pull:{tag:tag._id}});

    return res;

}



module.exports = {
    getTag, createTag, updateTag, deleteTag
}

