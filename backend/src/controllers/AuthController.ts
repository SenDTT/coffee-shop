import { RequestHandler } from "express";
import { ILoginReponse, ISignupBody, ISignupReponse } from "../types/AuthTypes";
import { IErrorResponse } from "../types/Common";
import { addUser, getUserByEmail, getUserById } from "../services/UserService";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signupController: RequestHandler<
  unknown,
  ISignupReponse | IErrorResponse,
  ISignupBody
> = async (req, res, next) => {
  try {
    const person: User = await addUser(req.body);

    res.json({
      success: true,
      data: person,
    });
  } catch (err) {
    next(err);
  }
};

export const loginController: RequestHandler<
  unknown,
  ILoginReponse | IErrorResponse,
  { email: string; password: string }
> = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password as string))) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }
    const resUser = {
      id: user?._id.toString(),
      email: user?.email,
      name: user?.name,
      username: user?.username,
      role: user?.role,
      profileImage: user?.profileImage || null,
      subcribedEmail: user?.subcribedEmail,
    };

    const accessToken = jwt.sign(resUser, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign({id: resUser.id}, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      data: { user: resUser, accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

export const refreshTokenController: RequestHandler<unknown, ILoginReponse | IErrorResponse, { refreshToken: string }> = async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        res.status(403).json({ success: false, message: "No refresh token provided"});
        return;
    }

    try {
        const token = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET as string
        ) as {id: string};

        const user = await getUserById(token.id);
        if (!user) {
            res.status(403).json({success: false, message: "Invalid refresh token"});
            return;
        }
        const resUser = {
        id: user?._id.toString(),
        email: user?.email,
        name: user?.name,
        username: user?.username,
        role: user?.role,
        profileImage: user?.profileImage || null,
        subcribedEmail: user?.subcribedEmail,
        };

        const newAccessToken = jwt.sign(
          resUser,
          process.env.JWT_SECRET as string,
          { expiresIn: "1d" }
        );

        res.json({
          success: true,
          data: {
            user: resUser,
            accessToken: newAccessToken,
            refreshToken: refreshToken,
          },
        });

    } catch (err) {
        next(err);
    }
}
