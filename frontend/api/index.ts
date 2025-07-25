// lib/api.js
import axios from "axios";
import Cookie from "js-cookie";

let store: { dispatch: (action: any) => void } | undefined;

export const injectStore = (_store: { dispatch: (action: any) => void }) => {
  store = _store;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// Add a request interceptor to add the token to all requests
api.interceptors.request.use(
  (config) => {
    let token = Cookie.get("token"); // Get the token from cookies

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach the token to the Authorization header
    }

    const stored = localStorage.getItem("auth");
    if (stored) {
      token = JSON.parse(stored).accessToken;
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 500)
    ) {
      // Token expired or unauthorized, try to refresh token
      try {
        let refreshToken = "";
        const stored = localStorage.getItem("auth");
        if (stored) {
          refreshToken = JSON.parse(stored).refreshToken;
        }

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
          {
            refreshToken,
          }
        );

        // Save new token
        Cookie.set("token", data.token);
        Cookie.set("refreshToken", data.refreshToken);

        localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: data.token,
            refreshToken: data.refreshToken,
            user: data.user,
          })
        );

        // ✅ Dispatch to Redux
        if (store) {
          store.dispatch({
            type: "auth/setAuth",
            payload: {
              userData: data.user,
              accessToken: data.token,
              refreshToken: data.refreshToken,
            },
          });
        }

        // Retry the original request with the new token
        error.config.headers["Authorization"] = `Bearer ${data.token}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error("Error refreshing token", refreshError);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
