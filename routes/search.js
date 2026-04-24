const express=require("express");
const router=express.Router();
const {handleSearch}=require("../controllers/s");
router.post("/search",handleSearch);


module.exports=router;