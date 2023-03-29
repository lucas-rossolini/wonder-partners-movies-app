import React from "react";
import { NavLink } from 'react-router-dom';
import popcorn from "../assets/images/popcorn.png"

const Splashscreen = () => (
  <>
<NavLink to="/home">
    <main className="flex justify-center items-center h-screen">
      <img src={popcorn} alt="popcorn" />
    </main>
</NavLink>

  </>
);

export default Splashscreen;
