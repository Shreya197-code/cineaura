import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieList = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -480 : 480;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // 1. Loading Skeleton State
  if (!movies) {
    return (
      <div className="py-4 md:py-6 relative">
        <div className="h-7 w-48 bg-surface-elevated/60 rounded-md animate-pulse mb-3 md:mb-4 px-1" />
        <div className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-hidden pb-4 pt-2 px-1">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-36 sm:w-44 md:w-48 aspect-[2/3] flex-shrink-0 bg-surface-elevated/40 border border-border/40 rounded-md animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // 2. Empty State
  if (movies.length === 0) {
    return (
      <div className="py-4 md:py-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-text tracking-tight mb-3 px-1">
          {title}
        </h2>
        <div className="bg-surface/50 border border-border rounded-md p-6 text-center text-text-muted text-sm">
          No movies available in this category right now.
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 md:py-6 relative group">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4 px-1">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-text tracking-tight">
          {title}
        </h2>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative">
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-10 h-10 -ml-4 rounded-full bg-surface-elevated/90 backdrop-blur-md border border-border text-text shadow-elevated opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-accent hover:text-background focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label={`Scroll ${title} left`}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Movie Cards Row */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-none gap-3 sm:gap-4 md:gap-5 pb-4 pt-2 px-1 scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title || movie.original_title}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-10 h-10 -mr-4 rounded-full bg-surface-elevated/90 backdrop-blur-md border border-border text-text shadow-elevated opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-accent hover:text-background focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label={`Scroll ${title} right`}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default MovieList;
