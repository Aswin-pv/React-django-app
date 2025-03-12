import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    searchText : ""
}

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers: {
        setSeachText: (state,action) => {
            state.searchText = action.payload;
        }
    }
})

export const {setSeachText} = searchSlice.actions;

export default searchSlice.reducer;