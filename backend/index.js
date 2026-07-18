require("dotenv").config();
const express=require("express");
const port=5000;
const app=express();

const {connectMongoose}=require("./connections/m");
const logger = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

//routes

const SearchStatic=require("./routes/search");
const AnalyzeStatic=require("./routes/analyze");

const cors = require('cors');
app.use(cors({
  origin: ["http://localhost:3001", "http://localhost:3000", "http://192.168.29.123:3000"]
}));
connectMongoose(process.env.MONGO_URI);
app.use(logger);
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use("/api",SearchStatic);
app.use("/api/analyze",AnalyzeStatic);
app.use(notFound);
app.use(errorHandler);

app.listen(port,() => {
  console.log(`server chal rha hai iss port pe ${port}`)
}
)
