import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkAUTH } from "../helper/helperFN";
import { history } from "../index";
const BASE_URL_AUTH = process.env.REACT_APP_AUTH_API_URL;
const BASE_URL = process.env.REACT_APP_API_URL;
const initialState = {
  Quesions: [],
  Token: "",
  User: {},
  errors: null,
  loading: false,
  WelcomeMsg: "",
  unAuth: false,
};
const NonAuthHeaders = () => {
  let lang = localStorage.getItem("lang");
  return {
    "Accept-Language": lang,
  };
};
const AuthHeaders = () => {
  let token = localStorage.getItem("token");
  let lang = localStorage.getItem("lang");
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials": "true",
    "Accept-Language": lang,
    Authorization: "Bearer " + token,
  };
};

//get questions list after register
export const GetQuestionsData = createAsyncThunk(
  "GetQuestionsData",
  async (payload, thunkAPI) => {
    if (checkAUTH()) {
      var response = await axios
        .post(BASE_URL + "/getQuesWithAnswers", payload, {
          headers: AuthHeaders(),
        })
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          if (error.response.status == 401) {
            history.push("/login");
            window.location.reload();
          } else {
            return error.response.data;
          }
        });
      return response;
    } else {
      history.push("/login");
      window.location.reload();
    }
  }
);

//save ques List
export const saveQuesList = createAsyncThunk(
  "saveQuesList",
  async (payload, thunkAPI) => {
    if (checkAUTH()) {
      var response = await axios
        .post(BASE_URL + "/saveRegistrationSteps", payload, {
          headers: AuthHeaders(),
        })
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          if (error.response.status == 401) {
            history.push("/login");
            window.location.reload();
          } else {
            return error.response.data;
          }
        });
      return response;
    } else {
      history.push("/login");
      window.location.reload();
    }
  }
);

//complete myprofile (call after answer questions)
export const CompleteMyProfile = createAsyncThunk(
  "CompleteMyProfile",
  async (payload, thunkAPI) => {
    var response = await axios
      .post(BASE_URL_AUTH + "/CompleteMyProfile", payload)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
    return response;
  }
);

//verify email
export const ConfirmOTP = createAsyncThunk(
  "ConfirmOTP",
  async (payload, thunkAPI) => {
    var response = await axios
      .post(BASE_URL_AUTH + "/ConfirmOTP", payload)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
    return response;
  }
);

///normal register && gmail Register (different on API path & payload)
export const RegisterUser = createAsyncThunk(
  "RegisterUser",
  async (data, thunkAPI) => {
    var response = await axios
      .post(BASE_URL_AUTH + data.path, data.payload, {
        headers: NonAuthHeaders(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
    return response;
  }
);

//normal login & gmail Login (different on API path & payload)
export const LoginUser = createAsyncThunk(
  "LoginUser",
  async (data, thunkAPI) => {
    var response = await axios
      .post(BASE_URL_AUTH + data.path, data.payload, {
        headers: NonAuthHeaders(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
    return response;
  }
);
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.pending, (state, action) => {
      state.User = null;
      state.loading = true;
    });

    //start register
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      if (action.payload.status != null && action.payload.status != 200) {
        state.User = null;
        state.loading = false;
        state.errors = JSON.stringify(action.payload.errors);
      } else {
        state.User = action.payload;
        state.loading = false;
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.errors = action.payload != null ? action.payload.msg : "";
      }
    });
    builder.addCase(RegisterUser.rejected, (state, { payload }) => {
      state.User = null;
      state.loading = false;
    });
    //end register

    //start Login
    builder.addCase(LoginUser.pending, (state, action) => {
      state.User = null;
      state.loading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      if (action.payload.status != null && action.payload.status != 200) {
        state.User = null;
        state.loading = false;
        state.errors = JSON.stringify(action.payload.errors);
      } else {
        state.User = action.payload;
        state.loading = false;
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.User = null;
      state.loading = false;
    });

    //end login

    //start confirm otp
    builder.addCase(ConfirmOTP.pending, (state, action) => {
      state.User = null;
      state.loading = true;
    });
    builder.addCase(ConfirmOTP.fulfilled, (state, action) => {
      if (action.payload.status != null && action.payload.status != 200) {
        state.User = null;
        state.loading = false;
        state.errors = JSON.stringify(action.payload.errors);
      } else {
        state.User = action.payload;
        state.loading = false;
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    });
    builder.addCase(ConfirmOTP.rejected, (state, action) => {
      state.User = null;
      state.loading = false;
    });
    //end confirm otp

    //start complete my profile
    builder.addCase(CompleteMyProfile.pending, (state, action) => {
      state.loading = true;
      state.User = null;
    });
    builder.addCase(CompleteMyProfile.fulfilled, (state, action) => {
      if (action.payload.status != null && action.payload.status != 200) {
        state.User = null;
        state.loading = false;
        state.errors = JSON.stringify(action.payload.errors);
      } else {
        state.User = action.payload;
        state.loading = false;
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.errors = action.payload != null ? action.payload.msg : "";
      }
    });
    builder.addCase(CompleteMyProfile.rejected, (state, action) => {
      state.loading = false;
      state.User = null;
    });
    //end complete my profile

    //registration questions get & save
    builder.addCase(GetQuestionsData.pending, (state, { payload }) => {
      state.Quesions = null;
      state.loading = true;
      state.errors = "";
    });
    builder.addCase(GetQuestionsData.fulfilled, (state, { payload }) => {
      state.Quesions = payload;
      state.loading = false;
    });
    builder.addCase(GetQuestionsData.rejected, (state, { payload }) => {
      state.Quesions = null;
      state.loading = false;
    });

    builder.addCase(saveQuesList.pending, (state, { payload }) => {
      state.WelcomeMsg = null;
      state.loading = true;
      state.errors = null;
      state.isSuccessed = true;
    });
    builder.addCase(saveQuesList.fulfilled, (state, { payload }) => {
      state.WelcomeMsg = payload.WelcomeMsg;
      state.loading = false;
      state.errors = payload.errors;
      state.isSuccessed = payload.success;
    });
    builder.addCase(saveQuesList.rejected, (state, { payload }) => {
      state.WelcomeMsg = payload.WelcomeMsg;
      state.loading = false;
      state.errors = payload.errors;
      state.isSuccessed = payload.success;
    });
  },
});

//export const { GetQuestions } = registerSlice.actions;
export default registerSlice.reducer;
