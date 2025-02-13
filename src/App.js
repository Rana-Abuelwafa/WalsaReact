import "./styles/shared.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/signInUp/login/login";
import Register from "./components/signInUp/register/register";
import WelcomeMsg from "./components/signInUp/SignMsgs/WelcomeMsg";
import RegisterationResponse from "./components/signInUp/RegisterationQues/RegisterationResponse";
import RegisterQues from "./components/signInUp/RegisterationQues/RegisterQues";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/Welcome" element={<WelcomeMsg />} />
          <Route path="/Response" element={<RegisterationResponse />} />
          <Route path="/RegisterQues" element={<RegisterQues />} />
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  );
}

export default App;
