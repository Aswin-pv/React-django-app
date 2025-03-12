import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../actions/categoryActions";


const initialState = {
    categories: [],
    totalResults: 0,
    isLoading: false,
    error:'',
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(fetchCategories.fulfilled, (state,action) => {
            state.categories = action.payload.results;
            state.totalResults = action.payload.count;
            state.isLoading = false
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
})

export default categorySlice.reducer;