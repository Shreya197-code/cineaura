import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieslice";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = useCallback(async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular",
        API_OPTIONS
      );

      const jsonData = await data.json();

      console.log(jsonData);

      dispatch(addPopularMovies(jsonData.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);
};

export default usePopularMovies;