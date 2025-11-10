let inMemoryToken = null;

export const getAccessToken = () => localStorage.getItem("token");
export const setAccessToken = (token) => {
  inMemoryToken = token;
  localStorage.setItem("token", token);
};
export const clearAccessToken = () => {
  inMemoryToken = null;
  localStorage.removeItem("token");
};

// export const getRefreshToken = () =>
//   inMemoryToken || localStorage.getItem("accessToken");
// export const setRefreshToken = (token) => {
//   inMemoryToken = token;
//   localStorage.setItem("accessToken", token);
// };
// export const clearRefreshToken = () => {
//   inMemoryToken = null;
//   localStorage.removeItem("accessToken");
// };
