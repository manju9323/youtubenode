const Videos=require("../models/videos");
const Usermans=require("../models/users");
const {createError}=require("../error");
const { Promise } = require("mongoose");
const videos = require("../models/videos");


const addvideo=async(req,res,next)=>{
    const newvideo= new Videos({userId:req.user._id,...req.body});
    try{
       const savedvideo=await newvideo.save()
       res.status(200).json(savedvideo)
    }
    catch(err){next(err)}
}  

const updatevideo=async(req,res,next)=>{
    try{
      const video=await Videos.findById(req.params.id)
      if(!video) return next(createError(404,"video not found!"))
      if(req.user._id===video.userId)
      {
        const updatedvideo=await Videos.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedvideo)
      }  
      else{
        return next(createError(403,"you can udate only your video!"))
      }
    }
    catch(err){next(err)}   
    
}

const deletevideo=async(req,res,next)=>{
  try{
    const video=await Videos.findById(req.params.id)
    if(!video) return next(createError(404,"video not found!"))
    if(req.user._id===video.userId || req.user._id==="637d774abec67f6aacce5d9d")
    {
      await Videos.findByIdAndDelete(req.params.id)
      res.status(200).json("this video has been deleted")
    }
    else{
      return next(createError(403,"you can delete only your video!"))
    }
  }
  catch(err){next(err)} 
}

const getvideo=async(req,res,next)=>{
    try{
     
      if(req.params.currentuser){
        const preHis= await Usermans.findById(req.params.currentuser);
        const Histo= await Usermans.findByIdAndUpdate(req.params.currentuser,{
          $addToSet:{History:req.params.id}},{new:true});

          if(Histo.History.length !== preHis.History.length)
          {
            const View= await Videos.findByIdAndUpdate(req.params.id,{$inc:{views:1}})
          }
        }
      const video=await Videos.findById(req.params.id);
      res.status(200).json(video)  
    }
    catch(err){next(err)}
} 

const getvideosuserid=async(req,res,next)=>{
  try{ 
    const video=await Videos.find({userId:req.params.id});
    res.status(200).json(video)
  }
  catch(err){next(err)}
}

const addview=async(req,res,next)=>{
  try{
    await Videos.findByIdAndUpdate(req.params.id,{$inc:{views:1}});
    res.status(200).json("the view has been increased")
  }   
  catch(err){next(err)} 
} 

const random=async(req,res,next)=>{
  try{
    const video=await Videos.aggregate([{$sample:{size:40}}]);
    res.status(200).json(video)
    console.log("home",video)
  }
  catch(err){next(err)} 
}

const trend=async(req,res,next)=>{ 
  try{
    const video=await Videos.find().sort({views:-1})
    res.status(200).json(video)
  }
  catch(err){next(err)}
}



const History=async(req,res,next)=>{
  try{
    const user=await Usermans.findById(req.user._id);
    const watchhistory = user.History;
     if(watchhistory.length==0)
     {
      return
     }
    const list = await Promise.all(
       watchhistory.map((Hist)=>{
        return Videos.find({_id:Hist}) 
       }) 
    ); 
    console.log("list",list) 
    res.status(200).json(list.flat().sort((a,b)=> b.createdAt - a.createdAt))
  }
  catch(err){console.log(err)  
    next(err)}
}

const sub=async(req,res,next)=>{
  try{
    const user=await Usermans.findById(req.user._id);
    const subscribe = user.SubscribedUsers;
     if(subscribe.length==0)
     {
      return
     }
    const list = await Promise.all(
       subscribe.map((channelId)=>{
        return Videos.find({userId:channelId}) 
       }) 
    ); 
    console.log("list",list) 
    res.status(200).json(list.flat().sort((a,b)=> b.createdAt - a.createdAt))
  }

  catch(err){console.log(err)  
    next(err)}
}

const getbytag=async(req,res,next)=>{
  const quer=req.query.tags.split(",")
  console.log(req.query.tags.type,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
  try{
    const video=await Videos.find({tags:{$in:quer}}).limit(20)
    res.status(200).json(video)
    console.log(video)
  }
  catch(err){next(err)}
} 

const search=async(req,res,next)=>{
  const quer=req.query.q 
  try{

    const video=await Videos.find({title:{$regex: quer,$options:"i"}}).sort({views:-1}) 
    res.status(200).json(video) 
  }   
  catch(err){next(err)} 
}      
       
      
 
module.exports={addvideo,updatevideo,deletevideo,getvideo,addview,random,trend,sub,getbytag,search,getvideosuserid,History}     