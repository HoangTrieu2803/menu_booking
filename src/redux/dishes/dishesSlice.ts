import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "../../ClientTemplate/MenuPage/type";
import api from "../../util/util";
import {FoodState} from "../type";

export const getDishes = createAsyncThunk<Food[]>(
  "foods/getFoods",
  async (_, thunkApi) => {
    try {
      const data = await api.get("/dish");
      return data.data;
    } catch (err:any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const deleteDish = createAsyncThunk(
  "foods/deleteFood",
  async (id: any) => {
    try {
      const data = await api.delete(`/dish/${id}`);
      return data.data;
    } catch (err:any) {
      return console.log(err);
    }
  }
);

export const updateDish = createAsyncThunk(
  "foods/updateFood",
  async (dish : Food) => {
    try {
      const data = await api.put(`/dish/${dish._id}`,dish);
      return data.data;
    } catch (err:any) {
      return console.log(err);
    }
  }
);

export const addDish = createAsyncThunk(
  "foods/addFood",
  async (dish : Food) => {
    try {
      const data = await api.post(`/dish/`,dish);
      return data.data;
    } catch (err:any) {
      return console.log(err);
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
      })
      .addCase(deleteDish.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDish.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteDish.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDish.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDish.fulfilled, (state, action: PayloadAction<Food[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateDish.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addDish.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDish.fulfilled, (state, action: PayloadAction<Food[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addDish.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default dishesSlice.reducer;
