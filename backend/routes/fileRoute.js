import express from "express";
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/Users.js"
import { protectRoute } from "../middleware/authMiddleware.js"
import fs from "fs";

const router = express.Router();

router.post("/resume", protectRoute, upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }
    if (req.file && req.file.size === 0) {
      return res.status(400).json({ error: "File is empty. Check Frontend Headers." });
    }
    const filePath = req.file.path;
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "resumes",
      resource_type: "raw", // for pdf/doc/docx
      format: "pdf",
      flags: "attachment:false",
      public_id: `resume/${req.user._id}`
    });

    user.resumeUrl = uploadResult.secure_url;
    await user.save();

    fs.unlinkSync(filePath);

    res.status(200).json({
      message: "Uploaded successfully",
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
