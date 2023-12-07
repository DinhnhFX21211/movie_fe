import React, { createContext, useState } from "react";
const FilmContext = createContext();
function MovieProvider({ children }) {
  const [currentMovie, setCurrentMovie] = useState({
    id: "",
    name: "",
    releaseDate: "",
    vote: "",
    overview: "",
    backdrop: "",
    type: "null",
  });
  const value = { currentMovie, setCurrentMovie };
  return <FilmContext.Provider value={value}>{children}</FilmContext.Provider>;
}

export { FilmContext, MovieProvider };
