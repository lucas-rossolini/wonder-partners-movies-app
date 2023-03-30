import React from "react";

const SmallCard = function SmallCard({ movie }) {
  return (
    <div className="flex relative pr-3 mt-4">
      <img
        className="w-24 h-36 overflow-hidden rounded-2xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
        src={movie.thumbnail}
        alt={`${movie.title} thumbnail`}
      />
    </div>
  );
};

export default SmallCard;