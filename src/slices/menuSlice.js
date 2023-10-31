import {createSlice} from "@reduxjs/toolkit";

 const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        data: []
    },
    reducers: {
        putMenu (state, action) {
            state.data = action.payload
        }
    }
})

export const { putMenu} = menuSlice.actions;
 export default menuSlice.reducer;