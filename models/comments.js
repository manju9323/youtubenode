const mongoose=require("mongoose");

const commentschema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
       // unique:true,
     }, 

    videoId:{
        type:String,
        required:true,
     },
     desc:{
        type:String,
        required:true, 
     },
},
{timestamps:true});
  


module.exports=mongoose.model("Comment",commentschema) 