import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000; //decode.exp ->This is the expiration timestamp from the JWT payload (stored in seconds since Unix epoch)
  } catch (err) {                       //Date.now() / 1000 convert from milliseconds to seconds
    return true;
  }
};

export const checkAUTH = () => {
  const authToken = localStorage.getItem("token");
  if (authToken && !isTokenExpired(authToken)) {
  // if (authToken) {
    return true;
  } else {
    console.log("token is null Or expired");
    return false;
  }
};

export const checkIsLogin = () => {
  const authToken = localStorage.getItem("token");
  const userLocal = localStorage.getItem("user");
  console.log("authToken ", authToken);
  console.log("userLocal ", userLocal);
  if (authToken && userLocal) {
    return true;
  } else {
    console.log("there is no login user");
    return false;
  }
};
