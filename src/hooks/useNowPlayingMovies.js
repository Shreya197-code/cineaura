import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieslice";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
  console.log("useNowPlayingMovies called");

  const dispatch = useDispatch();

  const getNowPlayingMovies = useCallback(async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing",
        API_OPTIONS
      );

      const jsonData = await data.json();

      console.log(jsonData); // ADD HERE

      dispatch(addNowPlayingMovies(jsonData.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getNowPlayingMovies();
  }, [getNowPlayingMovies]);
};

export default useNowPlayingMovies;