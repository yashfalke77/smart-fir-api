import _ from 'lodash';
import { Request, Response } from 'express';
import AuthRequest from '../interfaces/Request';
import ExpressError from '../utils/ExpressError';
import User from '../models/user.model';
import bcrypt from "bcrypt";

export const controller = {
  registerUser: async (req: AuthRequest, res: Response) => {
    const data = req.body;
    let user = await User.findOne({ email: data.email });
    console.log(user);
    if (user) throw new ExpressError('E-Mail Already exists', 400);
    let newUser = await User.create(data);
    const authToken = await newUser.generateAuthToken();
    res.status(200).json({
      data: { user: newUser, authToken },
      meta: {
        message: 'Registration is Successful',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },

  loginUser: async (req: Request, res: Response) => {
    const { phone, password } = req.body;
    const foundUser = await User.findOne({ phone });
    console.log(foundUser)
    if (!foundUser) throw new ExpressError('Invalid Credentials', 400);
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) throw new ExpressError('Invalid Credentials', 400);
    const token = await foundUser.generateAuthToken();
    res.status(200).json({
      data: {
        token,
        user: foundUser
      },
      meta: {
        message: 'Login Successful....',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },

  getUserById: async (req: Request, res: Response) => {
    const { params } = req;
    const user = await User.findById(params.id);
    if (!user) throw new ExpressError("User doesn't exists...", 400);
    res.status(200).json({
      data: user,
      meta: {
        message: 'Fetched User Successfully...',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },

  getAllUsers: async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json({
      data: users,
      meta: {
        message: 'Fetched Users Successfully...',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },

  deleteUser: async (req: Request, res: Response) => {
    const { params } = req;
    const user = await User.findByIdAndDelete(params.id);
    if (!user) throw new ExpressError("User doesn't exists...", 400);
    res.status(200).json({
      data: user,
      meta: {
        message: 'Deleted User Successfully...',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },

  updateUser: async (req: Request, res: Response) => {
    const { params, body } = req;
    const user = await User.updateOne({ _id: params.id }, body);
    if (!user) throw new ExpressError("User doesn't exists...", 400);
    res.status(200).json({
      data: user,
      meta: {
        message: 'Updated User Successfully...',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },
};
