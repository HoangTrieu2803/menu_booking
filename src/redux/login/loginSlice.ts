import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../util/util";
import { LoginState } from "../type";
import { LoginType } from "./type";

export const loginUser = createAsyncThunk(
  "login/postLogin",
  async (user : LoginType) => {
    const request = await api.post("/user/login",user)
    const response = request.data
    localStorage.setItem('user', JSON.stringify(response));
    return response 
  }
);

const initialState = {
  loading: false,
  data: {},
  error: "",
} as LoginState;

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default loginSlice.reducer;
