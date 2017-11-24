const Storage=require("@google-cloud/storage");
const randomstring=require("randomstring");
const Multer=require("multer");

// Google Cloud Bucket Domain
const CLOUD_BUCKET=process.env.CLOUD_BUCKET;
const storage=Storage({
  projectId:process.env.GCLOUD_PROJECT,
  keyFilename:process.env.KEYFILE_PATH
});
const bucket=storage.bucket(CLOUD_BUCKET);

// Return Google Storage Public URL
const getPublicUrl=(filename)=>{
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS=(req,res,next)=>{
  // Jika input file tidak ditemukan
  if(!req.file){
    req.uploadStatus=false;
    next();
  }

  // Memberi nama random pada file yang akan diupload
  const extRgx=/(?:\.([^.]+))?$/;
  const fileExt=extRgx.exec(req.file.originalname)[0];
  const randomName=randomstring.generate({length:40,charset:"alphanumeric"});
  const gcsname=randomName+fileExt;
  const file=bucket.file(`upload/${new Date().getFullYear()}/${gcsname}`);

  // Memulai proses upload
  const stream=file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  // Jika dalam proses upload terjadi error
  stream.on("error",(err)=>{
    req.uploadStatus=false;
    next();
  });

  // Jika proses upload berhasil / selesai
  stream.on("finish",()=>{
    file.makePublic().then(()=>{ // Menjadikan file tersedia secara publik
      req.file.cloudStoragePublicUrl=getPublicUrl(gcsname);
      req.uploadStatus=true;
      next();
    });
  });

  // Mengakhiri proses upload
  stream.end(req.file.buffer);
}

const multer=Multer({
  storage:Multer.MemoryStorage,
  limits:{
    fileSize: 5 * 1024 * 1024
  }
});

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}
