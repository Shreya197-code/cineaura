
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies.js";


const Browse = () => {

  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header />
     <div className="bg-black">
  <MainContainer />
  <SecondaryContainer />
</div>

      <h1 className="text-white">Browse Page</h1>
    </div>
  );
};

export default Browse;