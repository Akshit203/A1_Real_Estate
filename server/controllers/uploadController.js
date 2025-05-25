// const multer = require("multer");
// const uploadController = require("express").Router();


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/images");
//     },
//     filename: (req, file, cb) => {
//         cb(null, req.body.filename);
//     },
// });

// const upload = multer({
//     storage: storage,
// });

// uploadController.post("/image", upload.single("image"), async (req, res) => {
//     try {
//         return res.status(200).json("File uploded successfully");
//     } catch (error) {
//         console.error(error);
//     }
// });

// module.exports = uploadController

// uploadController.js
const multer = require("multer");
const uploadController = require("express").Router();
const User = require("../models/User");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
  const uniqueName = Date.now() + "-" + file.originalname;
  cb(null, uniqueName);
},
});

const upload = multer({ storage });

uploadController.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const userId = req.body.userId; // we will send this from frontend
    const profileImagePath = `images/${req.file.filename}`;

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: profileImagePath },
      { new: true }
    );

    return res.status(200).json({ profileImage: updatedUser.profileImage });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = uploadController;
