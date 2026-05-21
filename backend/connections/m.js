const mongoose=require("mongoose");
const express=require("express");
const app=express();
async function connectMongoose(url){
    try{

    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
    console.log("MongoDB connected ");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
    }
  catch{(err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }}
}
module.exports={connectMongoose}