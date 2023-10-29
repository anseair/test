import {createSlice} from "@reduxjs/toolkit";

 const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: []
    },
    reducers: {
        putMenu (state, action) {
            state.menu = action.payload
        }
    }
})

export const {putMenu} = menuSlice.actions;
 export default menuSlice.reducer;