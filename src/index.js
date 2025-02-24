import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { setDefaultTranslations, setDefaultLanguage } from "react-multi-lang";
import { Provider } from "react-redux";
import { LanguageProvider } from "react-multi-lang";
import store from "./redux/store";
import ar from "./translation/arb.json";
import en from "./translation/en.json";

// const translations = { en, arb };
// const locale =localStorage.getItem("lang")? localStorage.getItem("lang") :"en";
setDefaultTranslations({ ar, en });
setDefaultLanguage(localStorage.getItem("lang") || "en");
var createHistory = require("history").createBrowserHistory;

// in your function then call add the below
export const history = createHistory();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <LanguageProvider translations={translations} locale="en"> */} <App />
    {/* </LanguageProvider> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
