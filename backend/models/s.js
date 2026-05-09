const mongoose=require("mongoose");
const sSchema=new mongoose.Schema({
    city:{
        type:String,
        require:true,
    },
    businessType:{
        type:String,
        require:true,
    }

},{timestamps:true});
const search=mongoose.model("searchs",sSchema);
module.exports=search;