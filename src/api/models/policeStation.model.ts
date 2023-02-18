import mongoose, { Schema } from 'mongoose';

const PoliceStation = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  pincode: {
    type: String,
    minlength: 6,
    maxlength: 6,
    required: true,
  },
  area: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  inchargeName: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
});

export default mongoose.model('PoliceStation', PoliceStation);
