// import data, style
import React, { useState, useEffect } from "react";
import classes from "./Banner.module.css";

//Component Banner
function Banner(props) {
  const [backdrop, setBackdrop] = useState("");
  const [name, setName] = useState("");
  const [overview, setOverview] = useState("");
  const { data } = props;

  //Random movie
  useEffect(() => {
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length - 1)];
    //set data
    if (randomMovie?.backdrop_path == null) {
      // console.log(randomMovie);
      setBackdrop(`/3FLHePl9Y3n4BidLVjIA9qSRDOE.jpg`);
      setName(`Bhagya Lakshmi`);
      setOverview(
        `Hailing from a middle-class family, Lakshmi’s life is upended when she realises that her marriage to Rishi Oberoi, an industrialist’s son, is a sham to keep his death at bay.`
      );
    } else {
      setBackdrop(randomMovie?.backdrop_path);
      setName(randomMovie?.name);
      setOverview(randomMovie?.overview);
    }
  }, [data]);
  //render Banner
  return (
    <div className={classes.banner}>
      <img
        className={classes.bannerImg}
        src={backdrop && `https://image.tmdb.org/t/p/original${backdrop}`}
        alt="banner"
      />
      <div className={classes.bannerContent}>
        <h2 className={classes.name}>{name}</h2>
        <div className={classes.action}>
          <div className={classes.btn}>Play</div>
          <div className={classes.btn}>My List</div>
        </div>
        <p className={classes.overview}>{overview}</p>
      </div>
    </div>
  );
}

export default Banner;
