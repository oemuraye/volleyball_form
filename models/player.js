import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  profile_pic: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  whatsapp_number: {
    type: Number,
    required: true,
    // unique: true,
  },
  occupation: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Player", playerSchema);