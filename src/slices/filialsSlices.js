import {createSlice} from "@reduxjs/toolkit";

const filialsSlices = createSlice({
    name: 'filials',
    initialState: {
        filials: []
    },
    reducers: {
    putFilials(state, action) {
        state.filials = action.payload;
        }
    }
})
export const {putFilials} = filialsSlices.actions;
export default filialsSlices.reducer;