import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../util/util";
import { OrderState } from "../type";
import { Order } from "../../ClientTemplate/OrderPage/type";

export const postUser = createAsyncThunk(
  "login/postLogin",
  async (user : any) => {
    const response = await api.post("/user/signup",user)
    return response.data 
  }
);

const initialState = {
  loading: false,
  data: {},
  error: "",
} as any;

const userSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(postUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default userSlice.reducer;
