const app=require("express")();
const cors=require("cors");
const mongoose=require("mongoose");
const parser=require("body-parser");
const env=require("dotenv").config();
const upload=require("./helpers/upload");

app.use(cors());
var jsonParser=parser.json();
var urlencodedParser=parser.urlencoded({extended:false});
mongoose.connect(process.env.MONGODB_URL);

const api=require("./routes/api");
app.use("/api",api);

app.listen(3000,()=>{
  console.log("On port 3000!");
});
