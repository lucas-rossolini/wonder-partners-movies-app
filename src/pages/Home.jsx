import React, { useState, useEffect } from "react";
import axios from "axios";

import Searchbar from "../components/inputs/Searchbar";
import HorizontalCards from "../components/lists/HorizontalCards";

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

  const moviesShortList = [];
  const sortedList = moviesList.sort((a, b) => b.date - a.date);

  if (sortedList[0] !== undefined) {
    for (let i = 0; i <= 3; i += 1) {
      sortedList[i].id = i + 1;
      moviesShortList.push(sortedList[i]);
    }
  }
  console.log(moviesShortList);
  return (
    <>
      <h1 className="mt-11 ml-6">What do you want to watch?</h1>
      <Searchbar />
      <HorizontalCards list={moviesShortList} />
    </>
  );
};

export default Home;
