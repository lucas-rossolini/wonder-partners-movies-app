import React from "react";
import SmallCard from "../Cards/SmallCard";

const VerticalCards = function VerticalCards({list, defaultPic, showModal}) {
  return (
    <div className="flex flex-col m-auto p-auto">
      <div className="flex pb-10 hide-scroll-bar">
        <div className="flex flex-wrap lg:ml-40 md:ml-20 ml-8 ">
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
