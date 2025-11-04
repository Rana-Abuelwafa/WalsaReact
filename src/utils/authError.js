import { useTranslation, setLanguage, getLanguage } from "react-multi-lang";
const lang = localStorage.getItem("lang") || getLanguage();

export const createAuthError = (
  message = lang == "ar"
    ? "انتهي تسجيل الدخول. يرجي تسجيل الدخول مره اخري"
    : "Session expired. Please login again."
) => {
  return {
    message,
    isAuthError: true, // Flag to identify auth errors
  };
};
