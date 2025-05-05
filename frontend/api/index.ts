// lib/api.js
import axios from "axios";
import Cookie from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with your API base URL
});

// Add a request interceptor to add the token to all requests
api.interceptors.request.use(
  (config) => {
    const token = Cookie.get("token"); // Get the token from cookies

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach the token to the Authorization header
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
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized, try to refresh token
      try {
        const refreshToken = Cookie.get("refreshToken");
        const { data } = await axios.post("/refresh-token", { refreshToken });

        // Save new token
        Cookie.set("token", data.token);
        Cookie.set("refreshToken", data.refreshToken);

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
