import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Menu, MenuOrder } from "../../ClientTemplate/MenuPage/type";
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
  "menu/getMenuByUser",
  async (id : any) => {
    try {
      const response = await api.get(`/menu/byUser/${id}`);
      return response.data;
    } catch (err:any) {
      console.log(err)
    }
  }
);
export const getAMenu = createAsyncThunk(
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
export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (menu: MenuOrder) => {
    try {
      const response = await api.put(`/menu/${menu._id}`,menu);
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
      })
      .addCase(updateMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMenu.fulfilled, (state, action: PayloadAction<MenuOrder[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateMenu.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAMenu.fulfilled, (state, action: PayloadAction<MenuOrder[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAMenu.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});
export default menuSlice.reducer;
