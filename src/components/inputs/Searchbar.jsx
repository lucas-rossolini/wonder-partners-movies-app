import React from "react";

const Searchbar = function Searchbar({ isFocus, onChange }) {
  return (
    <div className="mx-7">
      <div className="relative flex items-center w-full h-11 rounded-2xl focus-within:shadow-lg bg-gray-200 overflow-hidden mt-12">
        <input
          className="peer h-full w-full outline-none text-sm text-gray-900 pl-6 bg-gray-200"
          type="text"
          id="search"
          placeholder="Search"
          autoFocus={isFocus}
          onChange={onChange}
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
