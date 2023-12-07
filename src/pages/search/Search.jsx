// import component, data, style
import React, { useState, useEffect, useRef } from "react";

import NavBar from "../browse/NavBar/NavBar";
import SearchForm from "./SearchForm/SearchForm";
import ResultList from "./ResultList/ResultList";
import classes from "./Search.module.css";
//component search
const Search = () => {
  const [query, setQuery] = useState("");
  const [moviesList, setMoviesList] = useState();
  const [optionGenre, setOptionGenre] = useState(null);
  const [optionMediaType, setOptionMediaType] = useState(null);
  const [genre, setGenre] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");
  const [pageSearch, setPageSearch] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  //set data search
  const searchHandler = (inputValue) => {
    setQuery(inputValue);
  };
  const resetHandler = (emptyvalue) => {
    setQuery(emptyvalue);
  };

  //useEffect fetch api
  useEffect(() => {
    const fetchapi = async function () {
      try {
        const response = await fetch(
          "https://movie-be-3pam.onrender.com/api/movies/search",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              keyword: query,
              token: "8qlOkxz4wq",
              genre,
              mediaType,
              language,
              year,
              pageSearch,
            }),
          }
        );
        if (!response) {
          throw new Error("Some thing went wrong");
        }
        const data = await response.json();
        setTotalPage(data.total_pages || 1);
        setMoviesList(data.results);
        if (!Boolean(data.results)) {
          console.log(data);
        }
      } catch (error) {
        console.log("Error message: " + error.message);
      }
    };

    fetchapi();
  }, [query, genre, mediaType, language, year, pageSearch]);

  useEffect(() => {
    const fetchapi = async function () {
      try {
        const response = await fetch(
          `https://movie-be-3pam.onrender.com/api/movies/genreList?token=8qlOkxz4wq`
        );
        if (!response) {
          throw new Error("Some thing went wrong");
        }
        const data = await response.json();

        setOptionGenre(data);
      } catch (error) {
        console.log("Error message: " + error.message);
      }
    };
    fetchapi();
  }, []);

  useEffect(() => {
    const fetchapi = async function () {
      try {
        const response = await fetch(
          `https://movie-be-3pam.onrender.com/api/movies/mediaType?token=8qlOkxz4wq`
        );
        if (!response) {
          throw new Error("Some thing went wrong");
        }
        const data = await response.json();

        setOptionMediaType(data);
      } catch (error) {
        console.log("Error message: " + error.message);
      }
    };
    fetchapi();
  }, []);

  const changeGenre = (event) => {
    setGenre(event.target.value);
  };

  const changeMediaType = (event) => {
    setMediaType(event.target.value);
  };
  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };
  const changeYear = (event) => {
    setYear(event.target.value);
  };

  const handlerSearchpage = () => {
    const pageSearch = Number(inputRefSearch.current.value);
    setPageSearch(pageSearch);
  };
  const inputRefSearch = useRef();
  //render Search
  return (
    <div>
      <NavBar isHomeClassname={false} />
      <SearchForm onSearch={searchHandler} onReset={resetHandler} />
      <div className={classes.containerOption}>
        {optionGenre?.length > 0 && (
          <div className={classes.itemOption}>
            <label htmlFor="genre">Genre:</label>
            <select id="genre" onChange={changeGenre}>
              <option value={""}>Select genre</option>
              {optionGenre.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {optionMediaType && (
          <div className={classes.itemOption}>
            <label htmlFor="mediaType">Media Type:</label>
            <select id="mediaType" onChange={changeMediaType}>
              <option value={""}>Select Media Type</option>
              {optionMediaType.map((mediaType) => (
                <option key={mediaType} value={mediaType}>
                  {mediaType}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={classes.itemOption}>
          <label htmlFor="language">Language:</label>
          <select id="language" onChange={changeLanguage}>
            <option value={""}>Select language</option>
            <option value={"en"}>en-us</option>
            <option value={"ja"}>jp</option>
            <option value={"ko"}>kr</option>
          </select>
        </div>

        <div className={classes.itemOption}>
          <label htmlFor="year">Year:</label>
          <input
            id="year"
            className={classes.pageinput}
            onChange={changeYear}
            defaultValue="All"
            type="number"
          />
        </div>
      </div>

      {query && moviesList && <ResultList movielist={moviesList} />}
      {query && (
        <div className={classes.page}>
          <input
            type="number"
            className={classes.pageinput}
            min={1}
            max={99}
            defaultValue={pageSearch}
            ref={inputRefSearch}
            onChange={handlerSearchpage}
          />
          <span>/{totalPage} pages</span>
        </div>
      )}
    </div>
  );
};

export default Search;
