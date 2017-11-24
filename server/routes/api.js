const router=require("express").Router();
const uploader=require("../helpers/upload");
const gifControll=require("../controllers/gifControll");

// Upload new GIF
router.post("/gif/upload",
  uploader.multer.single("image"),
  uploader.sendUploadToGCS,
  gifControll.upload
);

// Retrieve all posts from database
router.get("/gif/getAll",gifControll.getAll);

// Add like to GIF post
router.post("/gif/like/:id",gifControll.addLike);

module.exports=router;
