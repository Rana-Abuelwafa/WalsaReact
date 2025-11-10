import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { navigate } from "../helper/navigate";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "../helper/TokenHelper";
const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL_AUTH = process.env.REACT_APP_AUTH_API_URL;
// create instance
const api = axios.create({
  baseURL: BASE_URL,
  //withCredentials: true, // important for cookie refresh token
});
// Add request interceptor

api.interceptors.request.use(
  async (config) => {
    // const token = getAccessToken();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      //window.location.href = "/login";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];
// When multiple API requests fail at the same time (access token expired),
// we don’t want to refresh the token multiple times — just once,
// and queue the others until it’s done.
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};
// Add response interceptor

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // ✅ Queue other 401 requests until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const user = JSON.parse(localStorage.getItem("user"));
      const oldAccessToken = user?.accessToken;
      const oldRefreshToken = user?.refreshToken;
      try {
        const refreshResponse = await axios.post(BASE_URL_AUTH + "/refresh", {
          AccessToken: oldAccessToken,
          RefreshToken: oldRefreshToken,
        });

        console.log("refreshResponse ", refreshResponse);
        const newToken = refreshResponse?.data?.user?.accessToken;
        const newRefesh = refreshResponse?.data?.user?.refreshToken;
        localStorage.setItem(
          "user",
          JSON.stringify(refreshResponse?.data?.user)
        );
        // localStorage.setItem("token", newToken);
        // localStorage.setItem("RefreshToken", newRefresh);
        // ✅ Apply tro axios defaults for next requests
        api.defaults.headers.Authorization = `Bearer ${newToken}`;

        // ✅ Process queued requests with new token
        processQueue(null, newToken);

        // ✅ Retry the failed request
        return api(originalRequest);
      } catch (err) {
        // ❌ Refresh failed — clear everything and logout
        processQueue(err, null);
        localStorage.removeItem("user");
        // localStorage.removeItem("token");
        // localStorage.removeItem("RefreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // const token = getAccessToken();
//     const user = JSON.parse(localStorage.getItem("user"));
//     const token = user?.accessToken;
//     const refreshToken = user?.refreshToken;
//     const originalRequest = error.config;
//     console.log("originalRequest.url ", originalRequest.url);
//     // Skip refresh for login/register endpoints
//     if (
//       originalRequest.url.includes("/api/LoginUser") ||
//       originalRequest.url.includes("/api/RegisterUser") ||
//       originalRequest.url.includes("/api/ConfirmOTP") ||
//       originalRequest.url.includes("/api/LoginGmail") ||
//       originalRequest.url.includes("/api/ExternalRegister")
//     ) {
//       return Promise.reject(error);
//     }
//     console.log("error.response?.status", error.response?.status);
//     // Handle unauthorized
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         // Wait for refresh to finish, then retry
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["Authorization"] = "Bearer " + token;
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         console.log("token ", token);
//         // token refresh
//         // const refreshResponse = await authApi.post("/refresh");
//         // const refreshToken = localStorage.getItem("RefreshToken");
//         console.log("refreshToken ", refreshToken);
//         const refreshResponse = await axios.post(BASE_URL_AUTH + "/refresh", {
//           AccessToken: token,
//           RefreshToken: refreshToken,
//         });

//         console.log("refreshResponse ", refreshResponse);
//         const newToken = refreshResponse?.data?.user?.accessToken;
//         const newRefresh = refreshResponse?.data?.user?.refreshToken;
//         localStorage.setItem("RefreshToken", newRefresh);

//         //setAccessToken(newToken);
//         localStorage.setItem("token", newToken);
//         processQueue(null, newToken);

//         // Retry original request
//         originalRequest.headers["Authorization"] = "Bearer " + newToken;
//         return api(originalRequest);
//       } catch (refreshError) {
//         // 🚨 Refresh failed → clear tokens and redirect
//         console.log("Refresh failed → clear tokens and redirect", refreshError);
//         processQueue(refreshError, null);
//         //clearAccessToken();
//         localStorage.removeItem("token");
//         localStorage.removeItem("RefreshToken");
//         //window.location.href = "/login";
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     // Other errors
//     return Promise.reject(error);
//   }
// );

export default api;
