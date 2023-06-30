import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "../../ClientTemplate/MenuPage/type";
import api from "../../util/util";
import {FoodState} from "../type";

export const getDishes = createAsyncThunk<Food[]>(
  "foods/getFoods",
  async (_, thunkApi) => {
    try {
      const data = await api.get("/qltt/");
      return data.data;
    } catch (err:any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  loading: false,
  data: [],
  error: "",
} as FoodState;

const dishesSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDishes.fulfilled, (state, action: PayloadAction<Food[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDishes.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default dishesSlice.reducer;
