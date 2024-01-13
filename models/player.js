import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  occupation: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Player", playerSchema);