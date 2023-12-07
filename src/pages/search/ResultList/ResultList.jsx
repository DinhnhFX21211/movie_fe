// import component, data, style
import React, { useContext } from "react";

import { FilmContext } from "../../../Movie";
import MovieDetail from "../../browse/MovieDetail/MovieDetail";
import classes from "./ResultList.module.css";

//Component ResultList
function ResultList(props) {
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
      });
      //movie === currentmovie => hiden movie
    } else {
      movieCtx.setCurrentMovie({
        id: "",
        name: "",
        releaseDate: "",
        vote: "",
        overview: "",
        backdrop: "",
      });
    }
  };

  const detailSearchMovie = movieCtx.currentMovie?.id && <MovieDetail />;
  //render ResultList
  return (
    <>
      <h3 className={classes.title}>Search Result</h3>
      <div className={classes.list}>
        {props.movielist
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <img
              key={movie.id}
              id={movie.id}
              name={movie.name || movie.title}
              releasedate={movie.release_date}
              vote={movie.vote_average}
              overview={movie.overview}
              backdrop={movie.backdrop_path}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={classes.item}
              onClick={movieHandler}
            />
          ))}
      </div>
      {detailSearchMovie}
    </>
  );
}

export default ResultList;
