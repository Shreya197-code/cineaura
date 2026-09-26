import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMoviesSuggestion = () => {
  const gptState = useSelector((store) => store.gpt);
  const { movieResults, movieNames, loading, error } = gptState || {};

  // 1. Loading State
  if (loading) {
    return (
      <div className="py-6 space-y-6">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="py-4 relative">
            <div className="h-7 w-48 bg-surface-elevated/60 rounded-md animate-pulse mb-4 px-1" />
            <div className="flex gap-4 overflow-x-hidden pb-4 pt-2 px-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-36 sm:w-44 md:w-48 aspect-[2/3] flex-shrink-0 bg-surface-elevated/40 border border-border/40 rounded-md animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="mt-8 max-w-2xl mx-auto text-center bg-surface/80 border border-error/30 rounded-lg p-6 text-text shadow-card">
        <div className="text-3xl mb-2">⚠️</div>
        <h3 className="text-base font-semibold text-error mb-1">
          Search Error
        </h3>
        <p className="text-sm text-text-muted">{error}</p>
      </div>
    );
  }

  // 3. Initial Empty State
  if (!movieNames || movieNames.length === 0) {
    return (
      <div className="mt-8 max-w-2xl mx-auto text-center bg-surface/60 backdrop-blur-md border border-border rounded-lg p-8 shadow-card text-text-muted">
        <div className="text-4xl mb-3">🎬</div>
        <h3 className="text-lg font-display font-semibold text-text mb-2">
          Discover Movies with AI
        </h3>
        <p className="text-sm leading-relaxed">
          Type any query above — such as <span className="text-accent font-medium">"Retro sci-fi space thrillers"</span> or <span className="text-accent font-medium">"Heartwarming comedies for a rainy evening"</span> — to generate personalized recommendations.
        </p>
      </div>
    );
  }

  // 4. Results Display
  return (
    <div className="py-6 space-y-6 bg-surface-elevated/40 backdrop-blur-xl border border-border rounded-xl p-4 sm:p-6 shadow-elevated">
      {movieNames.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={movieResults?.[index]}
        />
      ))}
    </div>
  );
};

export default GPTMoviesSuggestion;


