import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    category: "",
    price: "",
    sort: "",
}

const FilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers:{
        addFilter: (state,action) => {
        const { key,value } = action.payload; //Get the key value pair
         state[key] = value; //Update the specific filter
        }
    }
})

export const {addFilter} = FilterSlice.actions;

export default FilterSlice.reducer;