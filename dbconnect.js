
const mongoose=require("mongoose");
require('dotenv').config();

/*
exports.connect=async()=>{
await mongoose.connect(process.env.mongo_url,()=>{
    console.log("db connected")
});  

};    */   

exports.connect=()=>{ 
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("db connected")
    }).catch((err)=>{
        console.log("throwerr")
    })
} 