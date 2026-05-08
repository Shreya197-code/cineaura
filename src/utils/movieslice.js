import { createSlice } from "@reduxjs/toolkit";

const movieslice = createSlice({
  name: "movies",

  initialState: {
    nowPlayingMovies: null,
  },

  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
  },
});

export const { addNowPlayingMovies } = movieslice.actions;

export default movieslice.reducer;