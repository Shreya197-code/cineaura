import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) {
    return (
      <div className="relative w-full h-[85vh] md:h-screen bg-surface/30 animate-pulse overflow-hidden flex items-center px-6 sm:px-12 md:px-16 lg:px-20 pt-20">
        <div className="max-w-2xl w-full space-y-4">
          <div className="h-10 sm:h-14 md:h-16 bg-surface-elevated/60 rounded-md w-3/4" />
          <div className="h-4 bg-surface-elevated/40 rounded-md w-full" />
          <div className="h-4 bg-surface-elevated/40 rounded-md w-5/6" />
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-28 bg-surface-elevated/80 rounded-md" />
            <div className="h-12 w-32 bg-surface-elevated/50 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

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
