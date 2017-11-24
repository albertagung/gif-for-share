const Gif=require("../models/gifModel");
const ObjectId=require('mongodb').ObjectID;

module.exports={
  upload:(req,res)=>{
    if(req.uploadStatus){
      gifData=new Gif({
        title:req.body.title,
        imgUrl:req.file.cloudStoragePublicUrl
      });
      gifData.save().then((stats)=>{
        res.send({status:true,data:stats});
      }).catch((err)=>{
        res.send({status:false,msg:"Failed to upload! Code DB01"});
      });
    }else{
      res.send({status:false});
    }
  },
  getAll:(req,res)=>{
    Gif.find().then((posts)=>{
      res.send({status:true,posts:posts});
    }).catch((err)=>{
      res.send({status:false,msg:"Failed to retrieve posts from DB!"});
    });
  },
  addLike:(req,res)=>{
    Gif.findOne({
      "_id":ObjectId(req.params.id)
    }).then((result)=>{
      Gif.updateOne({"_id":ObjectId(req.params.id)},{
        likes:result.likes + 1
      }).then((updateStat)=>{
        res.send({status:true,data:updateStat});
      });
    }).catch((err)=>{
      res.send({status:false,msg:"Failed to add like!"});
    });
  }
};
