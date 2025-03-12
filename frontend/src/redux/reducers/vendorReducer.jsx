import { createSlice } from "@reduxjs/toolkit";
import { fetchVendors } from "../actions/vendorAction";

const initialState = {
    vendors: [],
    totalResults: 0,
    isLoading: false,
    error:'',
}

const vendorSlice = createSlice({
    name: 'vendors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchVendors.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchVendors.fulfilled, (state, action) =>{
            state.vendors = action.payload.results;
            state.totalResults = action.payload.count;

        })
        .addCase(fetchVendors.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

    }
})

export default vendorSlice.reducer;