import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "../actions/cartActions";


const initialState = {
    cartItems:[],
    cart_count:0,
    isLoading: false,

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchCart.fulfilled, (state,action) => {
            state.cartItems = action.payload
            
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
})

export default cartSlice.reducer;