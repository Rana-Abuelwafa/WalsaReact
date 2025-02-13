import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  Quesions: [],
};
const questionsList = [
  { title: "Do you want design website for your brand" },
  { title: "Do you have brand idea" },
  { title: "Do you want design stationary for your brand" },
  { title: "Do you want redisgn your brand" },
];

export const GetQuestionsData = createAsyncThunk(
  "GetQuestionsData",
  async (payload, thunkAPI) => {
    return questionsList;
  }
);

const quesSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    GetQuestions: (state, params) => {
      return {
        ...state,
        Quesions: questionsList,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetQuestionsData.fulfilled, (state, { payload }) => {
      state.Quesions = payload;
    });
  },
});

export const { GetQuestions } = quesSlice.actions;
export default quesSlice.reducer;
