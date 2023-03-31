import React from "react";
import SmallCard from "../Cards/SmallCard";

const VerticalCards = function VerticalCards({list, defaultPic, showModal}) {
  return (
    <div className="flex flex-col m-auto p-auto">
      <div className="flex w-screen pb-10 hide-scroll-bar items-center justify-center">
        <div className="w-screen flex flex-wrap ml-8 ">
          {list.length > 0 && list[0] !== undefined
            ? list.map((movie, i) => (
                <div key={i} className="flex">
                  <SmallCard movie={movie} defaultPic={defaultPic} onClick={() => showModal(movie, "Details")} />
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default VerticalCards;
