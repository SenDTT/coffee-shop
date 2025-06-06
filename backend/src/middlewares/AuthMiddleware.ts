import { Request, RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import { ISignupBody, ISignupReponse } from "../types/AuthTypes";
import validator from "validator";
import { getUserByEmail, getUserById } from "../services/UserService";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRoles } from "../constants/Enum";

// Validate Auth
export const authenticate: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]!;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
      id: string;
    };
    const user = await getUserById(decoded.id);

    if (!user) {
      res.status(404).json({ success: false, message: "User does not exist." });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Validate user as admin
export const isAdminUser: RequestHandler = async (req, res, next) => {
  const role = (req as any).user?.role;

  if (role == UserRoles.user) {
    res.status(404).json({ success: false, message: "Access denied." });
    return;
  }

  next();
};

// Validate login
export const login_validator: RequestHandler<
  unknown,
  IErrorResponse | IResponseData,
  { email: string; password: string }
> = async (req, res, next) => {
  const { email, password } = req.body;

  if (validator.isEmpty(email) || validator.isEmpty(password)) {
    res
      .status(400)
      .json({ success: false, message: "The fields must be required!" });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ success: false, message: "Email is invalid!" });
    return;
  }

  if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)) {
    res.status(400).json({ success: false, message: "Password is invalid!" });
    return;
  }

  const person: User | null = await getUserByEmail(email);
  if (person == null) {
    res.status(400).json({ success: false, message: "Email does not exist." });
    return;
  }

  const match = await bcrypt.compare(password, person.password as string);

  if (!match) {
    res.status(401).json({ success: false, message: "Password is incorrect." });
    return;
  }

  next();
};

// Validate Signup
export const signup_validator: RequestHandler<
  unknown,
  IErrorResponse | ISignupReponse,
  ISignupBody
> = async (req, res, next) => {
  const { email, password, name, username } = req.body;

  if (
    validator.isEmpty(email) ||
    validator.isEmpty(password) ||
    validator.isEmpty(name) ||
    validator.isEmpty(username)
  ) {
    res
      .status(400)
      .json({ success: false, message: "The fields must be required!" });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ success: false, message: "Email is invalid!" });
    return;
  }

  const person: User | null = await getUserByEmail(email);
  if (person) {
    res.status(400).json({ success: false, message: "Email is existed." });
    return;
  }

  if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)) {
    res.status(400).json({ success: false, message: "Password is invalid!" });
    return;
  }

  next();
};
