import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-background px-4 md:px-12 -mt-20 md:-mt-32 relative z-30 space-y-2 pb-12">
      <div>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Comedy"} movies={movies.nowPlayingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;

