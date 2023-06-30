import { Food } from "../ClientTemplate/MenuPage/type";

export interface FoodState {
    loading: boolean;
    data: Food[];
    error: string;
}