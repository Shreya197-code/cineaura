import React from "react";
import { useSelector } from "react-redux";
import useMovieTrialer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {

  const trailerVideo = useSelector(
    (store) => store.movies?.trailerVideo
  );

  useMovieTrialer(movieId);

  if (!trailerVideo?.key) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>

      {/* YouTube Trailer */}
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}&playsinline=1`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>

    </div>
  );
};

export default VideoBackground;