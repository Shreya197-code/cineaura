
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies.js";

import GPTSearch from "./GPTSearch.js";
import { useSelector } from "react-redux";


const Browse = () => {
  const showGPTSearch = useSelector((state) => state.gpt.showGPTSearch);

  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header />
      {showGPTSearch ? (
        <GPTSearch />
      ) : (
        <>
          <div className="bg-black">
            <MainContainer />
            <SecondaryContainer />
          </div>
        </>
      )}

      <h1 className="text-white">Browse Page</h1>
    </div>
  );
};

export default Browse;