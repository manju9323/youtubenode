const Usermans =require("../models/users");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");
const {createError}=require("../error")
require('dotenv').config();
 

//register post
register=async(req,res,next)=>{  
    try{
        var salt=bcrypt.genSaltSync(10);
        var hash=bcrypt.hashSync(req.body.password,salt)

const newuser=await new Usermans({...req.body,password:hash})
await newuser.save()
res.status(200).send("user has been created")
    }
    catch(err){
        next(err)
    }
};


//login post 

login=async(req,res,next)=>{ 
try{
    let payload=req.body;
    const user=await Usermans.findOne({email:payload.email})
   
        if(!user)
        {
            return next(createError(404,"user with that mail does not exist"));
        }
        const validUser=await bcrypt.compare(payload.password,user.password);
        if(validUser)
        {
            const token = jwt.sign({_id:user._id},process.env.SECURE);
            const {password,...others}=user._doc;
            return res.cookie("t",token,{httpOnly:true,expire:new Date(Date.now() +99999999999)}).status(200).json({token,others});
           // console.log(token,others)
        }
        else{ 
            return next(createError(404,"invalid user/password"))
        }
    } 

catch(err){  
    return res.status(400).json({
        err:"user with that mail does not exist"
    });
}

}

googleAuth=async(req,res,next)=>{         
    try{
        const user=await Usermans.findOne({email:req.body.email});
        if(user){
            const token = await jwt.sign({_id:user._id},process.env.SECURE);
            const {password,...others}=user._doc;
            res.cookie("t",token,{httpOnly:true,expire:new Date(Date.now() +99999999999)}).status(200).json({token,others});
            console.log(others)
        }
        else{
            const newuser = await new Usermans({
                ...req.body,fromGoogle:true
            })
            const saveuser=await newuser.save()
            const token = jwt.sign({_id:saveuser._id},process.env.SECURE);
            const {password,...others}=saveuser._doc;
            res.cookie("t",token,{httpOnly:true,expire:new Date(Date.now() +99999999999)}).status(200).json({token,others});
             
        } 
    }
    catch(err){
   next(err)
    }
}



/*
//login post
login=async(req,res,next)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        if(!user)
        return res.send("error username")

        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect)
        return res.send("password wrong")

        //usingjwt for login person is admin or not
        const token=jwt.sign({_id:user._id}, 
            process.env.jwt)
 

        const{password,isAdmin,...otherDetails}=user._doc;
  
    
res.cookie("access_token",token,{httpOnly:true}).status(200).send({otherDetails});
    }
    catch(err){       
        res.send("err")

    }

}  
*/
//logout
 logout=(req,res)=>{
    res.clearCookie("t");
    res.json({
    message:"sucessfully signedout"

    })
 }



module.exports={register,login,logout,googleAuth}