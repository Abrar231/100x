const db = require('../models/index.js');
const path = require('path');
const multer  = require('multer');
const AWS = require('aws-sdk');
const {accessKeyId, secretAccessKey, sessionToken, region, s3BucketName} = require('../config/config.js');

AWS.config.update({accessKeyId, secretAccessKey, sessionToken, region});

const s3 = new AWS.S3();

const authenticateUser = async (req, res, next) => {
    const user_id = req.cookies.user_id;
    if(!user_id){
        return res.status(401).json({message: 'Unauthorized', isAuthenticated: false});
    }
    try {
        req.current_user = await db.User.findOne({where: {id: user_id}});
        next();
    } catch (error) {
        res.status(401).send('Invalid User' + error);
    }
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToS3 = async (req, res, next) => {
    const files = req.files;
    const uploadPromises = [];
  
    if (!files) return next();
  
    for (const fieldName in files) {
      const file = files[fieldName][0];
      const params = {
        Bucket: s3BucketName,
        Key: `images/user_id-${req.cookies.user_id}-${fieldName}-${Date.now()}${path.extname(file.originalname)}`,
        Body: file.buffer,
        ContentType: file.mimetype
      };
  
      uploadPromises.push(
        s3.upload(params).promise()
          .then(data => ({ fieldName, location: data.Location }))
      );
    }
  
    try {
      const results = await Promise.all(uploadPromises);
      req.fileUrls = results.reduce((acc, result) => {
        acc[result.fieldName] = result.location;
        return acc;
      }, {});
      next();
    } catch (error) {
      next(error);
    }
  };

  async function cleanupUnusedUserFiles(userId, activeAvatarKey, activeBgImageKey) {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: `images/user_id-${userId}` // Adjust this to match your file naming convention
    };
  
    try {
      const listedObjects = await s3.listObjectsV2(params).promise();
      const deletePromises = listedObjects.Contents.map(async (object) => {
        if (object.Key !== activeAvatarKey && object.Key !== activeBgImageKey) {
          await deleteFileFromS3(object.Key);
        }
      });
  
      await Promise.all(deletePromises);
      console.log(`Cleanup completed for user ${userId}`);
    } catch (error) {
      console.error(`Error during cleanup for user ${userId}:`, error);
    }
  }

module.exports = {authenticateUser, upload, uploadToS3, cleanupUnusedUserFiles}