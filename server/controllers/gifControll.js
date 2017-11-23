const Gif=require("../models/gifModel");

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
  addLike:(req,res)=>{
  }
};
