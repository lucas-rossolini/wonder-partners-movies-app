import React from "react";

const Searchbar = function Searchbar() {
  return (
    <div className="max-w-md mx-7">
      <div className="relative flex items-center w-full h-11 rounded-2xl focus-within:shadow-lg bg-gray-500 overflow-hidden mt-12">
        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pl-6 bg-gray-500"
          type="text"
          id="search"
          placeholder="Search"
        />
        <div className="grid place-items-center h-full w-12 text-gray-300 pr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
