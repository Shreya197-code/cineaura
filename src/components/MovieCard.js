import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, title }) => {
  if (!posterPath) return null;

  return (
    <div className="w-36 sm:w-44 md:w-48 aspect-[2/3] flex-shrink-0 relative group rounded-md overflow-hidden bg-surface border border-border shadow-card transition-all duration-200 ease-out hover:scale-[1.04] hover:-translate-y-1 hover:shadow-elevated hover:border-accent/40 cursor-pointer focus-within:ring-2 focus-within:ring-accent">
      <img
        alt={title || "Movie Card"}
        src={IMG_CDN_URL + posterPath}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      {title && (
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
          <p className="text-xs sm:text-sm font-semibold text-text line-clamp-2 drop-shadow">
            {title}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;

