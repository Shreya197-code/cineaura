
import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const language = useSelector(
    (state) => state.config?.language || "en"
  );

  

  return (
    <div className="flex justify-center pt-32 px-4">
      <form className="w-full max-w-3xl bg-black/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-4 md:p-6 flex items-center gap-3">

        <input
          type="text"
          placeholder={
            lang[language]?.GPTSearchPlaceholder ||
            lang.en.GPTSearchPlaceholder
          }
          className="
            flex-1
            px-5 py-4
            rounded-xl
            bg-white/10
            border border-white/10
            text-white
            placeholder-gray-400
            outline-none
            focus:ring-2 focus:ring-cyan-400
            focus:border-cyan-400
            transition-all duration-300
          "
        />

        <button
          type="button"
          className="
            px-6 py-4
            rounded-xl
            bg-cyan-500
            text-white
            font-semibold
            tracking-wide
            hover:bg-cyan-400
            hover:scale-105
            active:scale-95
            transition-all duration-300
            shadow-lg shadow-cyan-500/30
          "
        >
          🔍 {lang[language]?.search || lang.en.search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;