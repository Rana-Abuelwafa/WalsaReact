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
import { detectLanguage } from "./utils/languageService";
import store from "./redux/store";
import ar from "./translation/arb.json";
import en from "./translation/en.json";
import de from "./translation/de.json";

setDefaultTranslations({ ar, en, de });
setDefaultLanguage(detectLanguage());

var createHistory = require("history").createBrowserHistory;
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

reportWebVitals();
