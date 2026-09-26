import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMoviesSuggestion = () => {
  const gptState = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gptState || {};

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

  return (
    <div className="py-6 space-y-6">
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

