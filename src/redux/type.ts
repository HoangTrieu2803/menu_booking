import { Food } from "../ClientTemplate/MenuPage/type";
import { MenuOrder } from "../ClientTemplate/MenuPage/type";
import { Package } from "../ClientTemplate/OrderPage/type";
import { LoginType } from "./login/type";
import { Order } from "../ClientTemplate/OrderPage/type";
export interface FoodState {
    loading: boolean;
    data: Food[];
    error: string;
}

export interface MenuState{
    loading : boolean;
    data: MenuOrder[]
    error: string
}

export interface PackageState{
    loading: boolean;
    data: Package[];
    error: string;
}

export interface LoginState{
    loading: boolean;
    data : LoginType;
    error: string;
}

export interface OrderState{
    loading: boolean;
    data: Order[];
    error : string;
}