import express from "express"
import AWS from "aws-sdk"
import dotenv from "dotenv"
import  s3  from "../config/s3.js"
import { protectRoute } from "../middleware/authMiddleware.js"
import fs from "fs"
dotenv.config()

const router=express.Router()
router.use(protectRoute)
router.get("/generate-presigned-url", async (req, res) => {
const filename = req.query.filename;
if(!filename){
    return res.status(400).json({message:"Filename is required"})
}
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename, // filename passed from frontend
    Expires: 60, // URL expires in 60 seconds
    ContentType: req.query.contentType,
    ACL: 'public-read'
  };

  try {
    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    const publicUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${filename}`;
    res.json({ uploadURL,publicUrl });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating URL");
  }
}) 


export default router