import React, { useState, useEffect } from "react";
import axios from "axios";

import Searchbar from "../components/inputs/Searchbar";
import HorizontalCards from "../components/lists/HorizontalCards";
import VerticalCards from "../components/lists/VerticalCards";
import Modal from "../components/modals/Modal";

import defaultPic from "../assets/images/default-movie.png";
import theater from "../assets/images/theater.jpeg";

const Home = function Home() {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://europe-west1-movie-api-recruitment.cloudfunctions.net/movies"
      )
      .then((response) => {
        setMoviesList(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  let moviesShortList = [];
  const sortedList = JSON.parse(JSON.stringify(moviesList));
  sortedList.sort((a, b) => b.date - a.date);

  if (sortedList[0] !== undefined) {
    moviesShortList = sortedList.slice(0, 4);
  }

  const [modal, setModal] = useState({
    data: null,
    type: "",
    show: false,
  });

  const showModal = (itemPopup, modalType) => {
    setModal({
      data: itemPopup,
      type: modalType,
      show: true,
    });
    document.body.style.overflow = 'hidden';
  };

  const bgHideModal = () => {
    setModal({
      data: null,
      type: "",
      show: false,
    });
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <h1 className="mt-11 ml-6 text-lg font-semibold" style={{fontFamily: "Poppins"}}>What do you want to watch?</h1>
      <div onClick={() => showModal(moviesList, "Search")}>
        <Searchbar />
      </div>
      <HorizontalCards
        list={moviesShortList}
        defaultPic={defaultPic}
        showModal={showModal}
      />
      <VerticalCards
        list={moviesList}
        defaultPic={defaultPic}
        showModal={showModal}
      />

      {modal.show ? (
        <Modal item={modal} bgHide={bgHideModal} defaultPic={defaultPic} showModal={showModal} theater={theater} />
      ) : null}
    </>
  );
};

export default Home;
