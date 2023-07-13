import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../util/util";
import { Package } from "../../ClientTemplate/OrderPage/type";
import { PackageState } from "../type";

export const getPackage = createAsyncThunk<Package[]>(
  "package/getPackage",
  async (_, thunkApi) => {
    try {
      const data = await api.get("/package");
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
} as PackageState;

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPackage.fulfilled, (state, action: PayloadAction<Package[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPackage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default packageSlice.reducer;
