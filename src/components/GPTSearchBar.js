import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import {
  addGptMovieResult,
  setGptLoading,
  setGptError,
} from "../utils/gptslice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.config?.language || "en");
  const loading = useSelector((state) => state.gpt?.loading);
  const searchText = useRef(null);

  // Helper function to search movie in TMDB API
  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          encodeURIComponent(movie.trim()) +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await response.json();
      return json.results;
    } catch (err) {
      console.error("TMDB Search Error for movie:", movie, err);
      return [];
    }
  };

  const handleGPTSearchClick = async () => {
    const queryText = searchText.current?.value?.trim();
    if (!queryText) return;

    dispatch(setGptLoading(true));

    try {
      const gptQuery =
        "Act as a movie recommendation system and suggest some movies based on the query: " +
        queryText +
        ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      const gptResults = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: gptQuery,
          },
        ],
      });

      const gptContent = gptResults.choices?.[0]?.message?.content;
      if (!gptContent) {
        dispatch(setGptError("No movie recommendations found. Try another prompt."));
        return;
      }

      // Format comma-separated titles into array
      const gptMovies = gptContent
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m.length > 0);

      // Search TMDB for each movie title
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("OpenAI Error:", error);
      dispatch(
        setGptError(
          error.message || "Failed to fetch AI movie search recommendations."
        )
      );
    }
  };

  return (
    <div className="flex justify-center px-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGPTSearchClick();
        }}
        className="w-full max-w-3xl bg-surface-elevated/90 backdrop-blur-xl border border-accent/30 rounded-lg shadow-elevated p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 relative overflow-hidden group focus-within:border-accent shadow-[0_0_30px_rgba(6,182,212,0.12)] transition-all duration-300"
      >
        <div className="w-full sm:flex-1 relative">
          <input
            ref={searchText}
            type="text"
            placeholder={
              lang[language]?.GPTSearchPlaceholder ||
              lang.en.GPTSearchPlaceholder
            }
            className="w-full px-4 py-3.5 rounded-md bg-surface text-text placeholder-text-muted border border-border outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all text-sm sm:text-base"
          />
        </div>

        <button
          type="button"
          onClick={handleGPTSearchClick}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3.5 rounded-md bg-accent text-background font-semibold hover:bg-accent-muted transition-all duration-200 shadow-card focus:outline-none focus:ring-2 focus:ring-accent active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <span>✨</span>
              <span>{lang[language]?.search || lang.en.search}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
