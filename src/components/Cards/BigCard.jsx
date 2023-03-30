import React from "react";

const BigCard = function BigCard({ movie, num, defaultPic }) {
  function addDefaultPic(e){
    e.target.src=defaultPic
  }
  return (
    <div className="flex flex-col-reverse relative pr-7 mt-5">
      <div className="absolute">
        <div className="relative text-8xl top-8 right-3 font-semibold w-full h-full stroke text-DarkGray drop-shadow">{num}<div className="absolute text-DarkGray w-full top-0 no-stroke">{num}</div> </div>
      </div>
      <img
        className="w-auto h-52 max-w-xs overflow-hidden rounded-2xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
        src={movie.thumbnail}
        alt={`${movie.title} thumbnail`}
        onError={addDefaultPic}
      />
    </div>
  );
};

export default BigCard;
