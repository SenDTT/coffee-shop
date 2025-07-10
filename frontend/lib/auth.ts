// lib/auth.ts
import { cookies } from "next/headers";
import Cookies from "js-cookie";

export const getUserFromCookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
};

export const setClientToken = (token: string) => {
  Cookies.set("token", token, { expires: 7 });
};

export const removeClientToken = () => {
  Cookies.remove("token");
};
