import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="relative z-20 px-6 sm:px-12 md:px-16 lg:px-20 pt-20 md:pt-28 max-w-2xl text-text">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight drop-shadow-xl text-text">
        {title}
      </h1>

      <p className="py-4 text-sm sm:text-base md:text-lg text-text-muted line-clamp-3 sm:line-clamp-2 leading-relaxed drop-shadow-md">
        {overview}
      </p>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
        <button className="px-6 py-2.5 sm:py-3 bg-accent text-background font-semibold rounded-md hover:bg-accent-muted transition-all duration-200 shadow-card focus:outline-none focus:ring-2 focus:ring-accent active:scale-95 flex items-center gap-2 text-sm sm:text-base">
          <span>▶</span>
          <span>Play</span>
        </button>

        <button className="px-6 py-2.5 sm:py-3 bg-surface-elevated/80 backdrop-blur-md border border-border text-text font-semibold rounded-md hover:bg-white/10 transition-all duration-200 shadow-card focus:outline-none focus:ring-2 focus:ring-accent active:scale-95 flex items-center gap-2 text-sm sm:text-base">
          <span>ℹ</span>
          <span>More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;