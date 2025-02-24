export const checkAUTH = () => {
  let token = localStorage.getItem("token");
  if (token == null) {
    console.log("token is null");
    return false;
  }
  return true;
};
