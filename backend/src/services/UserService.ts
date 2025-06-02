import { User, UserModel } from "../models/User";
import { ISignupBody } from "../types/AuthTypes";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email: string) => {
  try {
    const user: User | null = await UserModel.findOne({ email });
    return user;
  } catch (err) {
    console.log("Error fetching user by email: ", err);
    throw err;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user: User | null = await UserModel.findById(id);
    return user;
  } catch (err) {
    console.log("Error fetching user by id: ", err);
    throw err;
  }
};

export const addUser = async (data: ISignupBody) => {
  let { password } = data;
  const hash = bcrypt.hashSync(password, 10);
  try {
    const user: User | null = await UserModel.create({
      ...data,
      password: hash,
      role: data.role ? data.role : "user",
      subcribedEmail: 1,
    });

    return user;
  } catch (err) {
    console.log("Error add user: ", err);
    throw err;
  }
};

export const uploadProfileImage = async (id: string, profileImage: string) => {
  try {
    const results = await UserModel.updateOne({ _id: id }, { profileImage });

    return results;
  } catch (err) {
    console.log("Uploading profile image failed: ", err);
    throw err;
  }
};

export const getAllUsers = async (
  filter: Record<string, any>,
  skip: number = 0,
  limit: number = 10
) => {
  try {
    const data = await UserModel.find(filter).skip(skip).limit(limit);
    const total = await UserModel.countDocuments(filter);
    return { data, total };
  } catch (err) {
    console.log("Fetching users failed: ", err);
    throw err;
  }
};

export const updateUserRole = async (id: string, role: "user" | "admin") => {
  try {
    const results = await UserModel.updateOne({ _id: id }, { role });

    return results;
  } catch (err) {
    console.log("Updating user role failed: ", err);
    throw err;
  }
};

export const activeOrDeactiveSubcribedEmail = async (
  id: string,
  subcribedEmail: number
) => {
  try {
    const results = await UserModel.updateOne({ _id: id }, { subcribedEmail });

    return results;
  } catch (err) {
    console.log("Updating user subcribed email failed: ", err);
    throw err;
  }
};

export const updateUserInfo = async (id: string, data: ISignupBody) => {
  try {
    const results = await UserModel.updateOne({ _id: id }, data);

    return results;
  } catch (err) {
    console.log("Updating user failed: ", err);
    throw err;
  }
};
