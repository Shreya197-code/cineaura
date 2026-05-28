import React from 'react'
import {useSelector} from 'react-redux'
import MovieList from './MovieList';



const SecondaryContainer = () => {
const movies =  useSelector((store) => store.movies);
console.log(movies);

  return (
    <div  className="px-6 md:px-12 -mt-32 relative z-30">
     <div>
       <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/> 
       <MovieList title={"Trending"} movies={movies.nowPlayingMovies}/> 
<MovieList title={"Popular"} movies={movies.popularMovies} />
         <MovieList title={"Upcoming Movies"} movies={movies.nowPlayingMovies}/> 
          <MovieList title={"Comedy"} movies={movies.nowPlayingMovies}/> 
     </div>




      
    </div>
  )
}

export default SecondaryContainer
