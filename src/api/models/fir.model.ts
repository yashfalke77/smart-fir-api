import mongoose, { Schema } from "mongoose";

const Status = new Schema(
  {
    status: {
      type: String,
      minlength: 10,
      maxlength: 2048,
      default: "FIR Registered",
    },
  },
  { timestamps: true }
);

const Fir = new mongoose.Schema(
  {
    subject: {
      type: String,
      minlength: 10,
      maxlength: 998,
      unique: true,
    },
    description: {
      type: String,
      minlength: 10,
      maxlength: 2048,
    },
    policeStation: {
      type: Schema.Types.ObjectId,
      ref: "PoliceStation",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    transactionHash: {
      type: String
    },
    FIRnumber:{
      type: Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Fir", Fir);
