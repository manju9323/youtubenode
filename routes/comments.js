const express=require("express");
const router=express.Router();
const {addcomment,deletecomment,getcomments}=require('../controllers/comments');
const {verifyToken}=require("../verifytoken")


router.post("/",verifyToken,addcomment)
router.delete("/:Id",verifyToken,deletecomment)
router.get("/:videoId",getcomments)



module.exports=router;   