import React from "react";
import BigCard from "../Cards/BigCard";

const HorizontalCards = function HorizontalCards({list}) {
  return (
    <div className="flex flex-col m-auto p-auto">
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
        <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
          {list.length > 0 && list[0] !== undefined
            ? list.map((movie, i) => (
                <div key={i+1} className="flex">
                  <BigCard movie={movie} num={i+1} />
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCards;
