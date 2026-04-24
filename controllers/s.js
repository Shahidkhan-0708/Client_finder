const {fetchFromOverPass }=require("../overpass/api")
const searchSchema=require("../models/s")
async function handleSearch(req,res){
const {city,businessType}=req.body;
const searchs=await searchSchema.create({
   city,businessType
})
const businesss=await fetchFromOverPass({city,businessType})
return res.json({businesss});
}

module.exports={
    handleSearch,
}