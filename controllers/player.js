import multer from "multer";
import path from "path";

import Player from '../models/player.js';

const img_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + "_" + file.originalname);
      // cb(null, file.originalname);
    },
  });
  
  export const upload = multer({
    storage: img_storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single("avatar");

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      // errorCb("Invalid file type");
      // cb(null, false);
      cb(false);
    }
  }
  
  