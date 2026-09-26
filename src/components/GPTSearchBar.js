import React, { useRef } from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";

const GPTSearchBar = () => {
  const language = useSelector(
    (state) => state.config?.language || "en"
  );

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
    <div className="flex justify-center pt-32 px-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-3xl bg-black/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-4 md:p-6 flex items-center gap-3"
      >
        <input
          ref={searchText}
          type="text"
          placeholder={
            lang[language]?.GPTSearchPlaceholder ||
            lang.en.GPTSearchPlaceholder
          }
          className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none"
        />

        <button
          type="button"
          onClick={handleGPTSearchClick}
          className="px-6 py-4 rounded-xl bg-cyan-500 text-white"
        >
          🔍 {lang[language]?.search || lang.en.search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;