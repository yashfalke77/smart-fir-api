import mongoose, { Schema } from 'mongoose';

const User = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  firs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Fir',
      required: true,
    },
  ],
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  phone: {
    type: String,
    minlenght: 10,
    maxlength: 10,
  },
  address: {
    street: {
      type: String,
      minlength: 5,
      maxlength: 255,
    },
    city: {
      type: String,
      minlength: 5,
      maxlength: 255,
    },
    state: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
  },
  pincode: {
    type: String,
    minlength: 6,
    maxlength: 6,
  },
  dob: {
    type: Date,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'authority'],
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('User', User);
