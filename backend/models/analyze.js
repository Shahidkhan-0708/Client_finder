const mongoose=require("mongoose");
const aSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    website:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
},{timestamps:true})
const anaSchema=mongoose.model("analyzations",aSchema);
module.exports=anaSchema