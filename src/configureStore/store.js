import {configureStore} from "@reduxjs/toolkit";
import filials from "../slices/filialsSlices";
export  const store = configureStore({
    reducer: {
        filials
    }
});