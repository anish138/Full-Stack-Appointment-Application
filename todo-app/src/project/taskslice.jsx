import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    shareappoinments:[],
    appoinmentscount:0
}

const createReducer = createSlice({
    name:"share",
    initialState,
    reducers:{
        addtoshare:(state,action)=>{
            state.shareappoinments.push(action.payload),
            state.appoinmentscount = state.appoinmentscount +1
        }
    }
})

export const {addtoshare}  = createReducer.actions;
export default createReducer.reducer