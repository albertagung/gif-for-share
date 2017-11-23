const router=require("express").Router();
const uploader=require("../helpers/upload");
const gifControll=require("../controllers/gifControll");

router.post("/gif/upload",
  uploader.multer.single("image"),
  uploader.sendUploadToGCS,
  gifControll.upload
);

module.exports=router;
