import {configureStore} from "@reduxjs/toolkit";
import filials from "../slices/filialsSlices";
import menu from "../slices/menuSlice";
import maxPages from "../slices/maxPagesSlice";

// store in
export  const store = configureStore({
    reducer: {
        filials, menu, maxPages
    }
});