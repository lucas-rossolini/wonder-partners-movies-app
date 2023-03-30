import React from "react";

const BigCard = function BigCard({ movie }) {
  return (
    <div className="flex flex-col-reverse relative pr-7 mt-5">
      <div className="absolute">
        <div className="relative text-8xl top-8 font-semibold w-full h-full stroke text-DarkGray">{movie.id}<div className="absolute text-DarkGray w-full top-0 no-stroke">{movie.id}</div> </div>
      </div>
      <img
        className="w-auto h-52 max-w-xs overflow-hidden rounded-2xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
        src={movie.thumbnail}
        alt={`${movie.title} thumbnail`}
      />
    </div>
  );
};

export default BigCard;
