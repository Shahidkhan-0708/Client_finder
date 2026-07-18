const mongoose=require("mongoose");
async function connectMongoose(url){
    try{
    await mongoose.connect(url);
    console.log("MongoDB connected");
    }
  catch(err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
module.exports={connectMongoose}
