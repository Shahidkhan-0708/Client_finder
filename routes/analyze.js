const express=require("express");
const router=express.Router();
const {analyzeGaps}=require("../controllers/analyze")
router.post("/",analyzeGaps);
module.exports=router;