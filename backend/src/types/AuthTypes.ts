import { User } from "../models/User";
import { IResponseData } from "./Common";

export interface ILoginReponse extends IResponseData {
  data: {
    user: Omit<User, "password" | "_id" | "createdAt" | "updatedAt"> & { id: string };
    accessToken: string,
    refreshToken: string
  };
}

export interface ISignupReponse extends IResponseData {
  data: User | null;
}

export interface ISignupBody {
  email: string;
  name: string;
  username: string;
  password: string;
}
