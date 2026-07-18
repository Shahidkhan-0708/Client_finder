const express=require("express");
const router=express.Router();
const {handleSearch}=require("../controllers/s");
const validate = require("../middleware/validate");
const searchValidator = require("../validators/searchValidator");

router.get("/search", validate(searchValidator, "query"), handleSearch);

module.exports=router;
