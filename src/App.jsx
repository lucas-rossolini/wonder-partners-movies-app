import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Page404, Splashscreen } from "./pages";

import "./App.scss";

const App = () => (
  <Routes>
    <Route exact path="/wonder-partners-movies-app" element={<Splashscreen />} />
    <Route exact path="/wonder-partners-movies-app/home" element={<Home />} />
    <Route exact path="*" element={<Page404 />} />
  </Routes>
);

export default App;
