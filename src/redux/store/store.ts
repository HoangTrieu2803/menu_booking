import { configureStore } from "@reduxjs/toolkit";
import dishesSlice from "../dishes/dishesSlice";
import menuSlice from "../menus/menuSlice";
import loginSlice from "../login/loginSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import packageSlice from "../package/packageSlice";

export const store = configureStore({
  reducer: {
    foods: dishesSlice,
    menu: menuSlice,
    package: packageSlice,
    login : loginSlice
  },
});

export const useAppDispatch:() => typeof store.dispatch=useDispatch;
export const useAppSelector :TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;