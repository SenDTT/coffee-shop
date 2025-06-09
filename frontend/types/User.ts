export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role?: "user" | "admin"; // optional if default is "user"
  profileImage?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  dateOfBirth?: Date | string; // string if you expect ISO format from APIs
  subcribedEmail?: 0 | 1;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
