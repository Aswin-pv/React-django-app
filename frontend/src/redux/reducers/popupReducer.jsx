import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    showModal:false,
}


export const popupSlice = createSlice({
    name:'popup',
    initialState,
    reducers:{
        changeModal: (state) => {
            if (state.showModal === false){
                state.showModal = true
            }else{
                state.showModal = false
            }
        },
        
    }
})

export const {changeModal} = popupSlice.actions;

export default popupSlice.reducer;