import React from "react";
import SmallCard from "../Cards/SmallCard";

const VerticalCards = function VerticalCards({list}) {
  console.log(list);
  return (
    <div className="flex flex-col m-auto p-auto">
      <div className="flex pb-10 hide-scroll-bar">
        <div className="flex flex-wrap lg:ml-40 md:ml-20 ml-8 ">
          {list.length > 0 && list[0] !== undefined
            ? list.map((movie, i) => (
                <div key={i} className="flex">
                  <SmallCard movie={movie} />
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default VerticalCards;
