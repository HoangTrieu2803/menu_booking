import { configureStore } from "@reduxjs/toolkit";
import dishesSlice from "../dishes/dishesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    foods: dishesSlice,
  },
});

export const useAppDispatch:() => typeof store.dispatch=useDispatch;
export const useAppSelector :TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;