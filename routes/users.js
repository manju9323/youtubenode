const express=require("express");
const router=express.Router();

const {update,deleteuser,getuser,subscribe,unsubscribe,like,dislike}=require('../controllers/users');
const {verifyToken}=require("../verifytoken")

    

 
//update
router.put("/:id",verifyToken,update);

 //delete     

router.delete("/:id",verifyToken,deleteuser);

//get
router.get("/find/:id",getuser);

//subscribe
router.put("/sub/:id",verifyToken,subscribe);
//unsubsc
router.put("/unsub/:id",verifyToken,unsubscribe);
  
//like
   router.put("/like/:videoId",verifyToken,like);
   //dislike
   router.put("/dislike/:videoId",verifyToken,dislike);


 
module.exports=router;  