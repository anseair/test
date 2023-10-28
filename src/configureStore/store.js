import {configureStore} from "@reduxjs/toolkit";
import filials from "../slices/filialsSlices";
import menu from "../slices/menuSlice";
export  const store = configureStore({
    reducer: {
        filials, menu
    }
});