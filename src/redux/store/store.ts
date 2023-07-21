import { configureStore } from "@reduxjs/toolkit";
import dishesSlice from "../dishes/dishesSlice";
import menuSlice from "../menus/menuSlice";
import loginSlice from "../login/loginSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlice from "../user/userSlice";
import packageSlice from "../package/packageSlice";
import orderSlice from "../order/orderSlice";

export const store = configureStore({
  reducer: {
    foods: dishesSlice,
    menu: menuSlice,
    package: packageSlice,
    login : loginSlice,
    signup: userSlice,
    order : orderSlice
  },
});

export const useAppDispatch:() => typeof store.dispatch=useDispatch;
export const useAppSelector :TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;