const express=require("express");
const router=express.Router();
const {handleSearch}=require("../controllers/s");
router.get("/search",handleSearch);

module.exports=router;