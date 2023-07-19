import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MenuOrder } from "../../ClientTemplate/MenuPage/type";
import api from "../../util/util";
import { MenuState} from "../type";

export const postMenu = createAsyncThunk(
  "menu/postMenu",
  async (menu : MenuOrder) => {
    try {
      const response = await api.post("/menu",menu);
      return response.data;
    } catch (err:any) {
      console.log(err)
    }
  }
);
export const getMenu = createAsyncThunk(
  "menu/getMenu",
  async (id : any) => {
    try {
      const response = await api.get(`/menu/${id}`);
      return response.data;
    } catch (err:any) {
      console.log(err)
    }
  }
);
const initialState = {
  loading: false,
  data: [],
  error: "",
} as MenuState;

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(postMenu.fulfilled, (state, action: PayloadAction<MenuOrder[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postMenu.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMenu.fulfilled, (state, action: PayloadAction<MenuOrder[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getMenu.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default menuSlice.reducer;
