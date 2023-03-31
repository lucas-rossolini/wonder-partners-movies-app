import React from "react";
import BigCard from "../Cards/BigCard";

const HorizontalCards = function HorizontalCards({list, defaultPic, showModal}) {
  return (
    <div className="flex flex-col m-auto p-auto">
      <div className="flex overflow-x-scroll overflow-y-hidden pb-10 hide-scroll-bar">
        <div className="flex flex-nowrap lg:mx-auto md:mx-auto ml-10 ">
          {list.length > 0 && list[0] !== undefined
            ? list.map((movie, i) => (
                <div key={i+1} className="flex">
                  <BigCard movie={movie} num={i+1} defaultPic={defaultPic} onClick={() => showModal(movie, "Details")} />
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCards;
