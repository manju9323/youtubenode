const express=require("express");
const router=express.Router();

const {addvideo,updatevideo,deletevideo,getvideo,addview,random,trend,sub,getbytag,search,getvideosuserid,History}=require('../controllers/movie');
const {verifyToken}=require("../verifytoken")

router.post("/",verifyToken,addvideo)
router.put("/:id",verifyToken,updatevideo)
router.delete("/:id",verifyToken,deletevideo)
router.get("/history",verifyToken,History)
router.get("/find/:id/:currentuser",getvideo) 
router.get("/findsamevideo/:id",getvideosuserid) 
router.put("/view/:id",addview) 
router.get("/trend",trend) 
router.get("/random",random) 
router.get("/sub",verifyToken,sub) 
router.get("/tags",getbytag)
router.get("/search",search)

module.exports=router;     