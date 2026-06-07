import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieslice";
import gptReducer from "./gptslice";
import confgReducer from "./configslice";

const appstore=configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
       gpt: gptReducer,
       config: confgReducer,
    }
})

export default appstore;