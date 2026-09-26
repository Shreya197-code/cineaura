import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative w-full h-[85vh] md:h-screen bg-background overflow-hidden flex items-center">
      {/* Video Background */}
      <VideoBackground movieId={id} />

      {/* Hero Title & Description Overlay */}
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;