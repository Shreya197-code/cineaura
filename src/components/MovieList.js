import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 py-4 bg-black">
      
      {/* Title */}
      <h1 className="text-white text-2xl md:text-3xl font-bold mb-5">
        {title}
      </h1>

      {/* Movie Row */}
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 pb-4 scroll-smooth">
        {(movies || []).map((movie) => (
          <div
            key={movie.id}
            className="transform hover:scale-105 transition duration-300 ease-in-out flex-shrink-0"
          >
            <MovieCard posterPath={movie.poster_path} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;