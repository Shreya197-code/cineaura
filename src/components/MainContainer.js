import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector(
    (store) => store.movies?.nowPlayingMovies
  );

  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];

  const { original_title, overview } = mainMovie;

  return (
    <div className="relative h-screen">
      <VideoTitle
        title={original_title}
        overview={overview}
      />

      <VideoBackground />
    </div>
  );
};

export default MainContainer;