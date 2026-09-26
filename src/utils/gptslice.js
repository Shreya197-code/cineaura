import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGPTSearch: false,
    movieNames: null,
    movieResults: null,
    loading: false,
    error: null,
  },
  reducers: {
    toggleGPTSearchView: (state) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
      state.loading = false;
      state.error = null;
    },
    setGptLoading: (state, action) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setGptError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  toggleGPTSearchView,
  addGptMovieResult,
  setGptLoading,
  setGptError,
} = gptSlice.actions;

export default gptSlice.reducer;