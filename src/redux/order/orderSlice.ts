import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../util/util";
import { OrderState } from "../type";
import { Order } from "../../ClientTemplate/OrderPage/type";

export const postOrder = createAsyncThunk(
  "order/postOrder",
  async (order : Order) => {
    const response = await api.post("/order",order)
    return response.data 
  }
);

export const getAllOrder = createAsyncThunk(
  "order/getOrder",
  async () => {
    const response = await api.get("/order")
    return response.data 
  }
);
const initialState = {
  loading: false,
  data: [],
  error: "",
} as OrderState;

const orderSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(postOrder.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrder.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default orderSlice.reducer;
