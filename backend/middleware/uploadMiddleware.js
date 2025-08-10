import multer from 'multer';
import path from 'path';

// Define the storage configuration for Multer.
const storage = multer.diskStorage({
  // The destination folder where uploaded files will be stored.
  destination: (req, file, cb) => {
    // You can customize this path as needed.
    // Ensure this directory exists in your project root.
    cb(null, '../uploads/resumes/');
  },
  // The filename for the uploaded file.
  filename: (req, file, cb) => {
    // We'll use the user's ID and the original file extension to ensure a unique filename.
    // The req.user.id is attached by our `protect` middleware.
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Define a file filter to ensure only specific file types are uploaded.
const fileFilter = (req, file, cb) => {
  const filetypes = /pdf|doc|docx/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only .pdf, .doc, and .docx files are allowed!'));
  }
};

// Create the Multer middleware instance.
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

export default upload;