import { configureStore } from "@reduxjs/toolkit";
import createReducer from "./taskslice.jsx"

export const store = configureStore({
    reducer:{
        sharedata:createReducer
    }
})