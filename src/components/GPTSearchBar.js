import React, { useRef } from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";

const GPTSearchBar = () => {
  const language = useSelector((state) => state.config?.language || "en");
  const searchText = useRef(null);

  const handleGPTSearchClick = async () => {
    try {
      console.log(searchText.current.value);

      const gptQuery =
        "Act as a movie recommendation system and suggest some movies based on the query " +
        searchText.current.value +
        ". Only give me names of 5 movies, comma separated.";

      const gptResults = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: gptQuery,
          },
        ],
      });

      console.log(gptResults.choices);
    } catch (error) {
      console.error("OpenAI Error:", error);
    }
  };

  return (
    <div className="flex justify-center px-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-3xl bg-surface-elevated/90 backdrop-blur-xl border border-accent/30 rounded-lg shadow-elevated p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 relative overflow-hidden group focus-within:border-accent shadow-[0_0_30px_rgba(6,182,212,0.12)] transition-all duration-300"
      >
        <div className="w-full sm:flex-1 relative">
          <input
            ref={searchText}
            type="text"
            placeholder={
              lang[language]?.GPTSearchPlaceholder ||
              lang.en.GPTSearchPlaceholder
            }
            className="w-full px-4 py-3.5 rounded-md bg-surface text-text placeholder-text-muted border border-border outline-none focus:border-accent focus:ring-2 focus:ring-accent transition-all text-sm sm:text-base"
          />
        </div>

        <button
          type="button"
          onClick={handleGPTSearchClick}
          className="w-full sm:w-auto px-6 py-3.5 rounded-md bg-accent text-background font-semibold hover:bg-accent-muted transition-all duration-200 shadow-card focus:outline-none focus:ring-2 focus:ring-accent active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
        >
          <span>✨</span>
          <span>{lang[language]?.search || lang.en.search}</span>
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;