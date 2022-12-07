const jwt =require("jsonwebtoken");
const {createError}=require("./error")
require('dotenv').config();

exports.verifyToken=async(req,res,next)=>{
   /* const token=req.cookies.t;
    if(!token) return next(createError(401,"you are not authenticated!"))

    jwt.verify(token,process.env.SECURE,(err,user)=>{
        if(err)
        return next(createError(401,"token is not valid!"))
         req.user=user;
        next()
    })*/
    let token=req.header("mm")
    console.log("uptoken",token)
jwt.verify(token,process.env.SECURE,(err,user)=>{ 
  console.log("token",token)
  if(err){
    console.log("usrrrrr",user)
    return next(createError(401,"token is not valid!"))
  }
  else{    
    req.user=user 
    console.log("req.user",req.user) 
    next()} 
}) 
}  
  

  