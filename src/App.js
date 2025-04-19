import "./styles/shared.scss";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/signInUp/login/login";
import Register from "./components/signInUp/register/register";
import WelcomeMsg from "./components/signInUp/SignMsgs/WelcomeMsg";
import RegisterationResponse from "./components/signInUp/RegisterationQues/RegisterationResponse";
import RegisterQues from "./components/signInUp/RegisterationQues/RegisterQues";
import Home from "./components/home/home";
import { ToastContainer } from "react-toastify";
function App() {
  const currentLang = localStorage.getItem("lang") || "en";
  // useEffect(() => {
  //   document.documentElement.setAttribute(
  //     "dir",
  //     currentLang === "ar" ? "rtl" : "ltr"
  //   );
  // }, [currentLang]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Welcome" element={<WelcomeMsg />} />
          <Route path="/Response" element={<RegisterationResponse />} />
          <Route path="/RegisterQues" element={<RegisterQues />} />
        </Routes>
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
