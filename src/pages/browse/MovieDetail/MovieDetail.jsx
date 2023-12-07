// import react, component, style
import React, { useContext, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { FilmContext } from "../../../Movie";
import classes from "./MovieDetail.module.css";

//Component MovieDetail
function MovieDetail() {
  const [movieContent, setMovieContent] = useState();
  const [idVideo, setIdVideo] = useState(null);

  //set data MovieContent
  const movieCtx = useContext(FilmContext);
  useEffect(() => {
    setMovieContent({
      name: movieCtx.currentMovie?.name,
      releaseDate: movieCtx.currentMovie?.releaseDate,
      vote: movieCtx.currentMovie?.vote,
      overview: movieCtx.currentMovie?.overview,
    });
  }, [movieCtx.currentMovie]);
  //fetch api => video trailer
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(
          "https://movie-be-3pam.onrender.com/api/movies/video",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              film_id: movieCtx.currentMovie.id,
              token: "8qlOkxz4wq",
            }),
          }
        );
        if (!response) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();

        if (data.key) {
          setIdVideo(data.key);
        } else {
          setIdVideo(null);
          console.log(data);
        }
      } catch (error) {
        console.log("Error message: " + error.message);
      }
    };
    fetchApi();
  }, [movieCtx.currentMovie]);
  //render video trailer or backdrop
  const videoRender =
    movieCtx.currentMovie && idVideo ? (
      <YouTube
        className={classes.youtube}
        videoId={idVideo}
        opts={{
          height: "400",
          width: "100%",
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    ) : (
      <img
        className={classes.backdrop}
        src={`https://image.tmdb.org/t/p/w500${movieCtx.currentMovie.backdrop}`}
        alt={movieCtx.currentMovie.name}
      />
    );
  // render MovieDetail
  return (
    <div className={classes.movie}>
      <div className={classes.detail}>
        <h2>{movieContent?.name}</h2>
        <p className={classes.date}>
          Release Date:{" "}
          {movieContent?.releaseDate ? movieContent?.releaseDate : "Not update"}
        </p>
        <p className={classes.vote}>Vote: {movieContent?.vote}/10</p>
        <p>{movieContent?.overview}</p>
      </div>
      <div className={classes.video}>{videoRender}</div>
    </div>
  );
}

export default MovieDetail;
