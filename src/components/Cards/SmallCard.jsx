import React from "react";

const SmallCard = function SmallCard({ movie, defaultPic, onClick }) {
  function addDefaultPic(e){
    e.target.src=defaultPic
  }

  return (
    <div className="flex relative pr-3 mt-4" onClick={() => onClick()} >
      <img
        className="w-24 h-36 md:h-44 md:w-32 overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
        src={movie.thumbnail}
        alt={`${movie.title} thumbnail`}
        onError={addDefaultPic}
      />
    </div>
  );
};

export default SmallCard;
