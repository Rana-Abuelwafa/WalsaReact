// import "./styles/shared.scss";
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingPage from "./components/Loader/LoadingPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchUserCountry,
  getCurrencyFromCountry,
} from "./utils/currencyService";
const UserCheck = lazy(() =>
  import(
    /* webpackPrefetch: true */ "./components/signInUp/UserCheck/UserCheck"
  )
);
const Home = lazy(() =>
  import(/* webpackPrefetch: true */ "./components/home/home")
);
const Login = lazy(() =>
  import(/* webpackPrefetch: true */ "./components/signInUp/login/login")
);
const Register = lazy(() =>
  import(/* webpackPrefetch: true */ "./components/signInUp/register/register")
);
const OTPInput = lazy(() =>
  import(/* webpackPrefetch: true */ "./components/signInUp/OTP/OTPInput")
);
const WelcomeMsg = lazy(() =>
  import(
    /* webpackPrefetch: true */ "./components/signInUp/SignMsgs/WelcomeMsg"
  )
);
const RegisterationResponse = lazy(() =>
  import(
    /* webpackPrefetch: true */ "./components/signInUp/RegisterationQues/RegisterationResponse"
  )
);
const RegisterQues = lazy(() =>
  import(
    /* webpackPrefetch: true */ "./components/signInUp/RegisterationQues/RegisterQues"
  )
);
const ContactUs = lazy(() =>
  import(/* webpackPrefetch: true */ "./components/contact/ContactUs")
);
const AboutPage = lazy(() =>
  import(/* webpackPrefetch: true */ "./components/about/AboutPage")
);
const Profile = lazy(() =>
  import(/* webpackPrefetch: true */ "./components/profile/Profile")
);

const Pricing = lazy(() =>
  import(/* webpackPrefetch: true */ "./components/pricing/PricingPlansPage")
);

const Confirmation = lazy(() =>
  import(
    /* webpackPrefetch: true */ "./components/confirmationPg/AppointmentConfirmation"
  )
);

function App() {
  useEffect(() => {
    // Programmatic preloading for likely next pages
    const preloadPages = async () => {
      if (window.location.pathname === "/login") {
        await import("./components/signInUp/register/register");
      }
    };

    // async function getCurrency() {
    //   //get default currency
    //   const countryCode = await fetchUserCountry();
    //   const currency = await getCurrencyFromCountry(countryCode);
    //   console.log("Detected Currency:", currency);
    // }
    // getCurrency();
    preloadPages();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                // <UserCheck>
                <Login />
                // </UserCheck>
              }
            />
            <Route
              path="/register"
              element={
                // <UserCheck>
                <Register />
                // </UserCheck>
              }
            />
            <Route path="/verifyEmail" element={<OTPInput />} />
            {/* page shown after user register successfully, static data */}
            <Route path="/Welcome" element={<WelcomeMsg />} />
            {/* page loaded after user answers registeration question , content get from API */}
            <Route path="/Response" element={<RegisterationResponse />} />
            {/* page shown after user register successfully, data from API */}
            <Route path="/RegisterQues" element={<RegisterQues />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/AboutUs" element={<AboutPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
