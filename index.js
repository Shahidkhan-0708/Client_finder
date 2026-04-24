require("dotenv").config();
const express=require("express");
const port=3000;
const app=express();
const {connectMongoose}=require("./connections/m");

//routes
const SearchStatic=require("./routes/search");
const AnalyzeStatic=require("./routes/analyze");




connectMongoose(process.env.MONGO_URL);
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use("/api",SearchStatic);
app.use("/api/analyze",AnalyzeStatic);

app.listen(port,() => {
  console.log(`server chal rha hai iss port pe ${port}`)
}
)