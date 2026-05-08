import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-40 px-12 absolute z-20 text-white">
      <h1 className="text-6xl font-bold">
        {title}
      </h1>

      <p className="py-6 text-lg w-1/3">
        {overview}
      </p>

      <div className="flex gap-4">
        <button className="bg-white text-black px-6 py-3 rounded-lg">
          ▶ Play
        </button>

        <button className="bg-gray-500 text-white px-6 py-3 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;