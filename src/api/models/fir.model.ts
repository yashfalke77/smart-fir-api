import mongoose, { Schema } from 'mongoose';

const Status = new Schema(
  {
    status: {
      type: String,
      minlength: 10,
      maxlength: 2048,
    },
  },
  { timestamps: true },
);

const Fir = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    phone: {
      type: String,
      minlenght: 10,
      maxlength: 10,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
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
    description: {
      type: String,
      minlength: 10,
      maxlength: 2048,
    },
    policeStation: {
      type: Schema.Types.ObjectId,
      ref: 'PoliceStation',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isEnabled: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: [Status],
    investigationOfficer: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Fir', Fir);
