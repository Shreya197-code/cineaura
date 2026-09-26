
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
    <div className="bg-background min-h-screen">
      <Header />
      {showGPTSearch ? (
        <GPTSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;