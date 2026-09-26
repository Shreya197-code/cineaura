import React from "react";
import GPTMoviesSuggestion from "./GPTMoviesSuggestion";
import GPTSearchBar from "./GPTSearchBar";
import { BACKGROUND_IMAGE } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div className="min-h-screen w-full bg-background relative overflow-x-hidden">
      {/* Background Poster Overlay with Scrim */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={BACKGROUND_IMAGE}
          alt="CineAura Background"
          className="w-full h-full object-cover opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 pt-28 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
        <GPTSearchBar />
        <GPTMoviesSuggestion />
      </div>
    </div>
  );
};

export default GPTSearch;

