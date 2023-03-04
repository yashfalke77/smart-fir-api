import _ from "lodash";
import { Request, Response } from "express";
import ExpressError from "../utils/ExpressError";
import User from "../models/user.model";

export const controller = {
  registerUser: async (req: Request, res: Response) => {
    // const { firstName, lastName, username, email, password, role } = req.body;
    // let user = await User.find({ email });
    // if (!user) throw new ExpressError("E-Mail Already exists", 400);
    // user = await User.find({ username });
    // if (!user) throw new ExpressError("Username Already exists", 400);
    // user = new User({ firstName, lastName, username, email, password, role });
    // user = await user.save();
    // const authToken = await user.generateAuthToken();
    // const token = await Token.generateToken(user._id, "email-verify");
    // const url = `http://localhost:8080/api/auth/${user._id}/confirmation_token/${token}`;
    // const text = template(user.firstName, url);
    // await sendEmail({
    //   to: user.email,
    //   subject: "Verify your Pico Account",
    //   text,
    // });

    // res.status(200).json({
    //   data: {
    //     ..._.pick(user, [
    //       "firstName",
    //       "lastName",
    //       "username",
    //       "email",
    //       "bio",
    //       "website",
    //       "instagram",
    //       "facebook",
    //       "_id",
    //     ]),
    //     authToken,
    //   },
    //   meta: {
    //     message: "Verify Your Email",
    //     flag: "SUCCESS",
    //     statusCode: 200,
    //   },
    // });
  },

  loginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findAndValidate(email, password);
    if (!user) throw new ExpressError("Invalid Credentials", 400);
    const token = await user.generateAuthToken();
    res.status(200).json({
      data: token,
      meta: {
        message: "Login Successful....",
        flag: "SUCCESS",
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
        message: "Fetched User Successfully...",
        flag: "SUCCESS",
        statusCode: 200,
      },
    });
  },
};
