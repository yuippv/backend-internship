require("dotenv").config()

const path = require("path");
const fs = require('fs')
const aws = require("aws-sdk");
const bucketName    = process.env.AWS_BUCKET_NAME 
const bucketRegion  = process.env.AWS_BUCKET_REGION 
const bucketKey     =  process.env.AWS_ACCESS_KEY 
const bucket_secret = process.env.SECRET_ACCESS_KEY 


aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: bucketKey,
  secretAccessKey: bucket_secret,
  region: bucketRegion,
  
});

const s3  = new aws.S3()
//upload a file to s3 
// async function uploadFile(file,userId)  {
//     const fileStream = fs.createReadStream(file.path)
//     const uploadParams = {
//         Bucket: bucketName,
//         Body: fileStream,
//         Key: "userAvatar/" + userId,
//         ContentType:  "image/jpeg",
//         ACL: "public-read",
//     }
    
    
//     return s3.upload(uploadParams).promise()

// }
async function  uploadManyFile(files,userId,pathS3){
  const fileReturn = await Promise.all(
    files.map(async (item, index) => {
      const filePath = path.join(__dirname, "..","..", "uploads", item.filename);
      const key = pathS3 + "/" + userId + "/" + item.filename
     
      var params = {
        Bucket: bucketName,
        Key: key,
        Body: fs.createReadStream(filePath),
        ContentType: "image/jpeg",
        ACL: "public-read",
      };
  
      const data = await s3
        .upload(params)
        .promise()
        .then((data) => {
          fs.unlinkSync(filePath);
  
          return data;
        });
  
      return data["Location"];
    })
  );
  
  return fileReturn;



}





exports.uploadManyFile = uploadManyFile


//dowmload a file from 23