require("dotenv").config()


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
function uploadFile(file,userId)  {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: "userAvatar/" + userId,
        ContentType:  "image/jpeg",
        ACL: "public-read",
    }
    
    
    return s3.upload(uploadParams).promise()

}

exports.uploadFile = uploadFile


//dowmload a file from 23