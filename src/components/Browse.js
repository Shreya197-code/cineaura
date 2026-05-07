import React from "react";
import Header from "./Header";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const Browse = () => {

  const getNowPlayingMovies = async () => {
    const data= await fetch('https://api.themoviedb.org/3/movie/now_playing', API_OPTIONS);
    const jsonData= await data.json();
    console.log(jsonData);
  };

  useEffect(()=>{
    getNowPlayingMovies();
  },[])







  return (
    <div>
      <Header />
      <h1 className="text-white">Browse Page</h1>
    </div>
  );
};

export default Browse;