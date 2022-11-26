// const Blog = require('../models/blog.js') ;
const mongoose = require("mongoose");
// const db = require("./models");
const Tutorial = require('../models/tutorial.js')
const Tag = require('../models/tag.js');
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

const getTutorial =(req, res, next) => {
    Tutorial.find().then(
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
const createTutorial = async (req, res, next) => {
    let msg = '';
    let {tutorial} = req.body;
    
    let newTutorial = await Tutorial.create(tutorial);
    await Tag.updateMany({"_id": newTutorial.tags}, {$push:{tags: newTutorial._id}});

    return res.send({
        status_code:res.statusCode,
        message:msg,
        data: newTutorial
    });
}

const updateTutorial = async (req, res, next) => {

    let _id = mongoose.Types.ObjectId(req.params.id);
    
    let { tutorial } = req.body;
    console.log(`tutorial: ${tutorial}`);  
    let newTags = tutorial.tags;
    console.log(`new tag: ${newTags}`);  
    let oldTutorial = await Tutorial.findOne({ _id: _id });
    let oldTags = oldTutorial.tags;
    console.log(`old tag: ${oldTags}`);  

    Object.assign(oldTutorial, tutorial);
    let newTutorial = await oldTutorial.save();
  

     let added = difference(newTags, oldTags);
     let removed = difference(oldTags, newTags);
    console.log(added, removed);
    await Tag.updateMany({ '_id': added }, { $addToSet: { tutorial: tutorial._id } });
    await Tag.updateMany({ '_id': removed }, { $pull: { tutorial: tutorial._id } });
  
     return res.send(newTutorial);
}


const deleteTutorial = async (req, res, next) => {
    // let status_code = 200;
    let msg ='';
    let _id = mongoose.Types.ObjectId(req.params.id);
    console.log(`id: ${_id}`);
    // let tutorial = await Tutorial.findOne({_id});
    const tutorial= await Tutorial.findById(_id);

   await Tutorial.findByIdAndDelete(_id).then(()=>{
        res.json({
            status_code:res.statusCode,
            message:'Tutorial delete successfully',
        
        })
    }).catch(error=>{
        res.json({
            statusCode:res.statusCode,
            message:'An error occurred'
        })
    });
    //  console.log(`tutorial: ${tutorial}`);
    await Tag.updateMany({"_id": tutorial._id}, {$pull:{tutorials:tutorial._id}});

    return res;

}



module.exports = {
    getTutorial,createTutorial,updateTutorial,deleteTutorial
}

