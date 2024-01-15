import multer from "multer";
import path from "path";

import Player from '../models/player.js';

const img_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./assets/uploads/");
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
  
  export const register = async (req, res) => {
    const {
      first_name,
      middle_name,
      last_name,
      gender,
      email,
      dob, 
      whatsapp_num,
      phone,
      address,
      occupation
    } = req.body;
  try {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const errors = [];

    const existingPlayer = await Player.findOne({ email });
    const existingPlayerNum = await Player.findOne({ whatsapp_number: whatsapp_num });

    // Check required fields
    if (
      !first_name ||
      !last_name ||
      !email ||
      !address ||
      !dob ||
      !phone ||
      !whatsapp_num ||
      !occupation
    ) {
      errors.push("Please fill in all fields");
    }

    if (gender === "none") {
      errors.push("Please choose a gender");
    }

    // Check email
    if (!email.match(validRegex)) {
      errors.push("Use a valid Email address");
    }
    // Check if email already exists
    if (existingPlayer ) {
      errors.push("A Player with this email already exists");
    }
    if (existingPlayerNum ) {
      errors.push("A Player with this number already exists");
    }

    if (errors.length > 0) {
      req.flash("error", errors);
      req.flash("formData", { first_name, middle_name, last_name, email, address, dob, phone, occupation, whatsapp_num });
      res.redirect("/");
    } else {
      upload(req, res, async (err) => {
        const maxSize = 2000000; // 2MB
        if (!req.file){
          // Handle error if req.file does not exist
          req.flash("error", "Upload an image");
          req.flash("formData", { first_name, last_name, middle_name, email, address, dob, phone, occupation, whatsapp_num });
          res.redirect("/");
        } else if (req.file.size > maxSize) {
          // A Multer error occurred when uploading
          req.flash("error", "Image size exceeds 2mb");
          req.flash("formData", { first_name, last_name, middle_name, email, address, dob, phone, occupation, whatsapp_num });
          res.redirect("/");
        } else if (err instanceof multer.MulterError && err.code === "Invalid file type") {
          // A Multer error occurred when uploading
          req.flash("error", "Image");
          req.flash("formData", { first_name, last_name, middle_name, email, address, dob, phone, occupation, whatsapp_num });
          res.redirect("/");
        } else {
          // No errors occurred when uploading
          // const hashedPassword = await bcrypt.hash(password, 10);
          await Player.create({
            name: `${first_name} ${middle_name} ${last_name}`,
            email,
            contact: `+234${phone.slice(-8)}`,
            whatsapp_number: `+234${whatsapp_num.slice(-8)}`,
            date_of_birth: dob,
            address,
            gender,
            profile_pic: req.file.filename,
            occupation,
          });
          req.flash("success_msg", "You are now registered");
          req.flash("formData", { last_name });
          res.redirect("/success");
          console.log(req.body);
        }
      });
    }
  } catch (error) {
    // Handle database error
    console.error(error);
    req.flash("error", "An error occurred while registering");
    req.flash("formData", { first_name, middle_name, last_name, email, address, dob, phone, occupation, whatsapp_num });
    res.render("/error");
  }
};