const Usermans=require("../models/users");
const {createError}=require("../error")
const Videos=require("../models/videos")

//update
 const update=async(req,res,next)=>{
    if(req.params.id===req.user._id){
        try{  
            let  updateuser= await Usermans.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});   
        res.status(200).json(updateuser)
            }
            catch(err){
               next(err);
            }    
    }
    else{ 
      return res.send("you can delete only your account")          
     // return next(createError(403,"You can update only your account"))
    }      
    }
      
      
//del    
const deleteuser=async(req,res)=>{
    if(req.params.id===req.user._id){
        try{  
            let  updateuser= await Usermans.findByIdAndDelete(req.params.id);   
        res.status(200).json("user has been deleted")
            }
            catch(err){
               next(err);
        
            }    
    }
    else{
      return res.send("you can delete only your account")          
     // return next(createError(403,"You can update only your account"))
    }    
    
 } 
 
 //get

const getuser=async(req,res,next)=>{
        try{  
            let  user = await Usermans.findById(req.params.id);   
            const {password,...others}=user._doc;
        res.status(200).json(others)
       console.log("getuser",user) 
            }
            catch(err){  
                next(err)
        
            }   
        }
//subscribe
const subscribe=async(req,res,next)=>{ 
            try{  
                let  user = await Usermans.findByIdAndUpdate(req.user._id,{$push:{SubscribedUsers:req.params.id}});   
                await Usermans.findByIdAndUpdate(req.params.id,{$inc:{subscriber:1}})
            res.status(200).send("subcription sucessfull")
                }
                catch(err){
                  next(err)
                }   
            }    

//unsbuscribe
const unsubscribe=async(req,res,next)=>{
    try{  
        let  user = await Usermans.findByIdAndUpdate(req.user._id,{
            $pull:{SubscribedUsers:req.params.id}});   
        await Usermans.findByIdAndUpdate(req.params.id,{
            $inc:{subscriber:-1}})
        res.status(200).send("unsubcription sucessfull")
        }
        catch(err){
          next(err)
        }   
    }             

const like=async(req,res,next)=>{
    const id=req.user._id;
    const videoid=req.params.videoId;
 try{
    await Videos.findByIdAndUpdate(videoid,{
        $addToSet:{likes:id},
        $pull:{dislikes:id}
    })
    res.status(200).json("the video has been liked.")
 }
 catch(err)
 {
    next(err)
 }
}
const dislike=async(req,res,next)=>{
    const id=req.user._id;
    const videoid=req.params.videoId;
    try{
        await Videos.findByIdAndUpdate(videoid,{
            $pull:{likes:id},
            $addToSet:{dislikes:id}
        })
        res.status(200).json("the video has been disliked.")
    }
    catch(err)
    {
       next(err)
    }
}




module.exports={update,deleteuser,getuser,subscribe,unsubscribe,like,dislike}