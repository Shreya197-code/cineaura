import { createSlice } from "@reduxjs/toolkit";

const movieslice = createSlice({
    name: "movies",
    initialState:{
        nowplayingMovies:null,
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowplayingMovies=action.payload;
        }
    }
});

export const { addNowPlayingMovies } = movieslice.actions;
export default movieslice.reducer;
