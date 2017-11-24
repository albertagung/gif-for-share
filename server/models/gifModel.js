const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const gifSchema=new Schema({
  title:{
    type:String,
    default:"Default Title"
  },
  imgUrl:String,
  likes:{
    type:Number,
    default:0
  },
  createdAt:{
    type:Date,
    default:new Date()
  }
});
const Gif=mongoose.model("Gif",gifSchema);

module.exports=Gif;
