import { Request } from "express";

interface User {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export default interface AuthRequest extends Request {
  user: User;
}
