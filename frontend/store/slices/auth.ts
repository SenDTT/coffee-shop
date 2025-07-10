// store/slices/auth.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  role: string;
  profileImage: string;
  subcribedEmail: number;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        userData: User | null;
        accToken: string | null;
        refToken: string | null;
      }>
    ) => {
      const { userData, accToken, refToken } = action.payload;

      state.user = userData;
      state.accessToken = accToken;
      state.refreshToken = refToken;

      if (userData && accToken && refToken) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: userData,
            accessToken: accToken,
            refreshToken: refToken,
          })
        );
        Cookies.set("token", accToken);
        Cookies.set("refreshToken", refToken);
      } else {
        localStorage.removeItem("auth");
        Cookies.remove("token");
        Cookies.remove("refreshToken");
      }
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem("auth");
      Cookies.remove("token");
      Cookies.remove("refreshToken");
    },
    // optional: hydrate Redux from localStorage on startup
    hydrateFromStorage: (state) => {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        state.user = parsed.user;
        state.accessToken = parsed.accessToken;
        state.refreshToken = parsed.refreshToken;
      }
    },
  },
});

export const { setAuth, logout, hydrateFromStorage } = authSlice.actions;
export default authSlice.reducer;
