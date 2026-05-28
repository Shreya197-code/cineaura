import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {

  const movies = useSelector(
    (store) => store.movies?.nowPlayingMovies
  );

  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Video */}
      <VideoBackground movieId={id} />

      {/* Movie Info */}
      <div className="absolute inset-0 z-20 flex items-center px-20">
        <VideoTitle
          title={original_title}
          overview={overview}
        />
      </div>

    </div>
  );
};

export default MainContainer;