const Comment=require("../models/comments");
const Videos=require("../models/videos");
const {createError}=require("../error");

const addcomment=async (req,res,next)=>{
    const newcomment=new Comment({...req.body,userId:req.user._id})
    try{
      const savedcomment=await newcomment.save() 
      res.status(200).send(savedcomment) 
    }
    catch(err)
    {
        next(err)
    } 
} 

const deletecomment=async (req,res,next)=>{
    try{
     const comment= await Comment.findById(req.params.Id)
     const video= await Videos.findById(Comment.userId)
     if(req.user._id===comment.userId || req.user._id===video.userId)
     {
        await Comment.findByIdAndDelete(req.params.Id)
        res.status(200).json("the comment has been deleted") 
     } 
     else{
        return next(createError(403,"you can delete only your comment"))
     }
    }
    catch(err)     
    {
        next(err)
    }
}

const getcomments=async (req,res,next)=>{
    try{
      const comments= await Comment.find({videoId:req.params.videoId})
      res.status(200).json(comments)
    } 
    catch(err)
    { 
        next(err) 
    }
}

module.exports={addcomment,deletecomment,getcomments}