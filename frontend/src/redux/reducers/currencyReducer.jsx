import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  currencyValue: 'inr',
}

export const currencySlice = createSlice({
    name:'currency',
    initialState,
    reducers:{
        changeCurrency: (state) => {
            if (state.currencyValue === 'inr'){
                state.currencyValue = 'usd';
                
            }else{
                state.currencyValue = 'inr';
            
            }
        },
        
    }
})

export const {changeCurrency} = currencySlice.actions;

export default currencySlice.reducer;