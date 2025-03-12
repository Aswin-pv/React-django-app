import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../actions/productActions";

const initialState = {
    products: [],
    currentProduct: null,
    totalResults: 0,
    isLoading: false,
    error:'',
}



const ProductsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
            state.error = ''
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
        
            state.isLoading = false;
     
            // Check if it's a single product or list of products
            if (action.payload.id) {
                // If it's a single product
                state.currentProduct = action.payload;
            
            } else {
                // If it's a list of products
                state.products = action.payload.results;
                state.totalResults = action.payload.count;
                
            }
        })
        .addCase(fetchProducts.rejected, (state, action) => {
    
            state.isLoading = false;
            state.error = action.error.message;
            state.currentProduct = null;
        });
       
    },
});


export default ProductsSlice.reducer;