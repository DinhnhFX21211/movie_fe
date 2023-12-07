// import react, component, style
import React, { useContext } from "react";

import { FilmContext } from "../../../Movie";
import classes from "./MovieList.module.css";

//Component MovieList
function MovieList(props) {
  const { data, isBackdrop = true, type } = props;
  const movies = data.results;
  const movieCtx = useContext(FilmContext);
  //function click movie
  const movieHandler = (event) => {
    //movie # currentmovie=> show movie
    if (event.target.id !== movieCtx.currentMovie.id) {
      movieCtx.setCurrentMovie({
        id: event.target.id,
        name: event.target.name,
        releaseDate: event.target.getAttribute("releasedate"),
        vote: event.target.getAttribute("vote"),
        overview: event.target.getAttribute("overview"),
        backdrop: event.target.getAttribute("backdrop"),
        type: event.target.getAttribute("type"),
      });
    }
    //movie === currentmovie => hiden movie
    else {
      movieCtx.setCurrentMovie({
        id: "",
        name: "",
        releaseDate: "",
        vote: "",
        overview: "",
        backdrop: "",
        type: null,
      });
    }
  };
  // render MovieList
  return (
    <div className={classes.movieList}>
      {movies
        .filter((movie) => movie.poster_path)
        .map((movie) => {
          return (
            <img
              key={movie.id}
              id={movie.id}
              name={movie.name || movie.title}
              releasedate={movie.release_date}
              vote={movie.vote_average}
              overview={movie.overview}
              backdrop={movie.backdrop_path}
              type={type}
              src={
                isBackdrop
                  ? movie.backdrop_path &&
                    `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                  : movie.poster_path &&
                    `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              }
              alt={movie.name ? movie.name : movie.title}
              onClick={movieHandler}
            />
          );
        })}
    </div>
  );
}
export default MovieList;
