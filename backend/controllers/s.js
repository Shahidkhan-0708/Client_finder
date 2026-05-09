const {fetchFromOverPass }=require("../overpass/api")
const Search=require("../models/s")
async function handleSearch(req,res){
    try{
const {city,type}=req.query;
if(!city||!type){
    return res.status(400).json({err:"City and type required"})
}
 await Search.create({
   city,businessType:type
})
const businesses=await fetchFromOverPass({city,businessType:type})
return res.json({businesses});
}
catch(err){
    console.error("Search error:", err.message);
    return res.status(500).json({ error: "Search failed", details: err.message });
}
}
module.exports={
    handleSearch,
}