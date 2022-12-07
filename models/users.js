const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
     },
     email:{ 
        type:String,
       unique:true,
       required:true,
     },
    password:{ 
        type:String,
    },
    img:{
        type:String,
    },
    subscriber:{
        type:Number,
        default:0,
    },
    SubscribedUsers:{
        type:[String],
    },
    History:{
        type:[String],
    },
    fromGoogle:{
        type:Boolean,
        default:false
    }
   
},
{timestamps:true});



module.exports=mongoose.model("Usermans",userschema) 