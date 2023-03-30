import React, { useState, useEffect } from "react";
import axios from "axios";

import Searchbar from "../components/inputs/Searchbar";
import HorizontalCards from "../components/lists/HorizontalCards";
import VerticalCards from "../components/lists/VerticalCards";

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

  console.log(moviesList);
  return (
    <>
      <h1 className="mt-11 ml-6">What do you want to watch?</h1>
      <Searchbar />
      <HorizontalCards list={moviesShortList} />
      <VerticalCards list={moviesList} />
    </>
  );
};

export default Home;
