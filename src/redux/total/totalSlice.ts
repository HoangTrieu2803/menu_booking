import { createAction, createReducer} from "@reduxjs/toolkit";
import { TotalState } from "../type";
export const totalAction = createAction <number> ("total")

const initialState = {
    total: 0
} as TotalState
export const totalSlice = createReducer(initialState, builder=>{
    builder.addCase(totalAction,(state,action)=>{
        state.total = action.payload
    })
})
export default totalSlice;