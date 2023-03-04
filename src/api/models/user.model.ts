import mongoose, { Schema, Model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config/vars";

interface User {
  name: string;
  email: string;
  role: string;
  firs: string[];
  gender: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
  pincode: string;
  dob: Date;
  isActive: boolean;
  password: string;
}

interface UserMethods {
  generateAuthToken: () => Promise<string>;
}

interface UserStatic extends Model<User, {}, UserMethods> {
  findAndValidate: (email: string, password: string) => Promise<boolean>;
}

const User = new mongoose.Schema<User, UserStatic, UserMethods>({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  firs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Fir",
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
    enum: ["male", "female", "other"],
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
    enum: ["user", "admin", "authority"],
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

User.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

User.statics.findAndValidate = async function (email, password) {
  const foundUser = await this.findOne({ email });
  if (!foundUser) return false;
  const isValid = await bcrypt.compare(password, foundUser.password);
  return isValid ? foundUser : false;
};

User.methods.generateAuthToken = async function () {
  const token = await jwt.sign(
    { _id: this._id, role: this.role, email: this.email },
    config.jwtSecret as string
  ); // , { expiresIn: jwtExpirationInterval }
  return token;
};

export default mongoose.model<User, UserStatic>("User", User);
