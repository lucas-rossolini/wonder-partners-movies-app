import React from "react";
import {
  CalendarIcon,
  ClockIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";

const SearchCard = function SearchCard({ movie, defaultPic, onClick }) {
  function addDefaultPic(e) {
    e.target.src = defaultPic;
  }
  return (
    <div className="flex pr-7 mt-5 ml-7" onClick={() => onClick()}>
      <img
        className="w-24 h-36 min-w-fit max-w-min overflow-hidden rounded-2xl hover:shadow-xl transition-shadow duration-300 ease-in-out"
        src={movie.thumbnail}
        alt={`${movie.title} thumbnail`}
        onError={addDefaultPic}
      />
      <div className="flex flex-col justify-between ml-3">
        <span className="text-ellipsis max-w-full ">{movie.title}</span>
        <div className="flex flex-col flex-nowrap">
          <div className="flex items-center "><TicketIcon className="block h-4 w-4 mx-1 text-xs" aria-hidden="true" /> {movie.type}</div>
          <div className="flex items-center"><CalendarIcon className="block h-4 w-4 mx-1 text-xs" aria-hidden="true" /> {movie.date}</div>
          <div className="flex items-center"><ClockIcon className="block h-4 w-4 mx-1 text-xs" aria-hidden="true" /> {movie.duration} Minutes</div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
