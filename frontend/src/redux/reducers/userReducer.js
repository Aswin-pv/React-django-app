import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    'role' : "",
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        currentUser: (state,action) => {
            console.log("from userreducer",action.payload)
            state.role = action.payload
        }
    }
})

export const {currentUser} = userSlice.actions;

export default userSlice.reducer;