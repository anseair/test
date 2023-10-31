import {configureStore} from "@reduxjs/toolkit";
import filials from "../slices/filialsSlices";
import menu from "../slices/menuSlice";
import maxPages from "../slices/maxPagesSlice";
export  const store = configureStore({
    reducer: {
        filials, menu, maxPages
    }
});