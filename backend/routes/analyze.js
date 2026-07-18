const express=require("express");
const router=express.Router();
const {analyzeGaps}=require("../controllers/analyze")
const { requireAnyBusinessField } = require("../validators/analyzeValidator");

router.post("/", requireAnyBusinessField, analyzeGaps);
module.exports=router;
