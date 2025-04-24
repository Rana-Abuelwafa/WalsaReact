import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-popup-alert/dist/index.css";
import reportWebVitals from "./reportWebVitals";
import { setDefaultTranslations, setDefaultLanguage } from "react-multi-lang";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./redux/store";
import ar from "./translation/arb.json";
import en from "./translation/en.json";

// const translations = { en, arb };
// const locale =localStorage.getItem("lang")? localStorage.getItem("lang") :"en";
setDefaultTranslations({ ar, en });
var FullUserLang = navigator.language || navigator.userLanguage;
var userLang = FullUserLang.slice(0, 2);
console.log("FullUserLang ", userLang);
setDefaultLanguage(localStorage.getItem("lang") || userLang);
var createHistory = require("history").createBrowserHistory;

// in your function then call add the below
export const history = createHistory();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <LanguageProvider translations={translations} locale="en"> */}
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
    {/* </LanguageProvider> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
