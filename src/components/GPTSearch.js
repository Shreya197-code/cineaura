import GPTMoviesSuggestion from "./GPTMoviesSuggestion";
import GPTSearchBar from "./GPTSearchBar";
import { BACKGROUND_IMAGE } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }} className="absolute inset-0 bg-cover bg-center">
      <GPTSearchBar />

      <GPTMoviesSuggestion/>
      

    </div>
  )
};

export default GPTSearch;
