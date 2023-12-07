// import component, data, style
import React, { useState, useEffect, useContext, useRef } from "react";
import { FilmContext } from "../../Movie";
import Banner from "./Banner/Banner";
import MovieList from "./MovieList/MovieList";
import MovieDetail from "./MovieDetail/MovieDetail";
import NavBar from "./NavBar/NavBar";
import classes from "./Browse.module.css";
//Component Browse
function Browse() {
  //fetch API
  function useFetch(endpoint, page) {
    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchApi = async () => {
        try {
          const response = await fetch(
            `https://movie-be-3pam.onrender.com/api/movies${endpoint}/${page}?token=8qlOkxz4wq`
          );
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.log("Error message: " + error.message);
        }
      };

      fetchApi();
    }, [endpoint, page]);

    return data;
  }
  const page = JSON.parse(localStorage.getItem("page")) || {
    pageTrending: 1,
    pageTopRated: 1,
    pageAction: 1,
    pageComedy: 1,
    pageHorror: 1,
    pageRomance: 1,
    pageDocument: 1,
  };
  const inputRefTrending = useRef();
  const inputRefTopRated = useRef();
  const inputRefAction = useRef();
  const inputRefComedy = useRef();
  const inputRefHorror = useRef();
  const inputRefRomance = useRef();
  const inputRefDocument = useRef();

  const handlerTrendingpage = () => {
    page.pageTrending = Number(inputRefTrending.current.value);
    localStorage.setItem("page", JSON.stringify(page));
    setPageTrending(page.pageTrending);
  };
  const handlerTopRatedpage = () => {
    page.pageTopRated = Number(inputRefTopRated.current.value);
    localStorage.setItem("page", JSON.stringify(page));
    setPageTopRated(page.pageTopRated);
  };
  const handlerActionpage = () => {
    page.pageAction = Number(inputRefAction.current.value);
    localStorage.setItem("page", JSON.stringify(page));
    setPageAction(page.pageAction);
  };
  const handlerComedypage = () => {
    page.pageComedy = Number(inputRefComedy.current.value);
    localStorage.setItem("page", JSON.stringify(page));
    setPageComedy(page.pageComedy);
  };
  const handlerHorrorpage = () => {
    page.pageHorror = Number(inputRefHorror.current.value);
    localStorage.setItem("page", JSON.stringify(page));
    setPageHorror(page.pageHorror);
  };
  const handlerRomancepage = () => {
    page.pageRomance = Number(inputRefRomance.current.value);
    localStorage.setItem("page", JSON.stringify(page));
    setPageRomance(page.pageRomance);
  };
  const handlerDocumentpage = () => {
    page.pageDocument = Number(inputRefDocument.current.value);
    localStorage.setItem("page", JSON.stringify(page));
    setPageDocument(page.pageDocument);
  };
  const [pageTrending, setPageTrending] = useState(page.pageTrending);
  const [pageTopRated, setPageTopRated] = useState(page.pageTopRated);
  const [pageAction, setPageAction] = useState(page.pageAction);
  const [pageComedy, setPageComedy] = useState(page.pageComedy);
  const [pageHorror, setPageHorror] = useState(page.pageHorror);
  const [pageRomance, setPageRomance] = useState(page.pageRomance);
  const [pageDocument, setPageDocument] = useState(page.pageDocument);

  //Sử dụng hooks useFetch đã custom để lấy tất cả dữ liệu của film
  const dataNetflixOriginals = useFetch("/top-rate", 1);
  const dataTrending = useFetch("/trending", pageTrending);
  const dataTopRated = useFetch("/top-rate", pageTopRated);
  const dataActionMovies = useFetch("/discover/28", pageAction);
  const dataComedyMovies = useFetch("/discover/35", pageComedy);
  const dataHorrorMovies = useFetch("/discover/27", pageHorror);
  const dataRomanceMovies = useFetch("/discover/10749", pageRomance);
  const dataDocumentaries = useFetch("/discover/99", pageDocument);
  //Filter by type movie
  const movieCtx = useContext(FilmContext),
    detailOriginals = movieCtx.currentMovie?.type === "Originals" && (
      <MovieDetail />
    ),
    detailTrending = movieCtx.currentMovie?.type === "Trending" && (
      <MovieDetail />
    ),
    detailTopRated = movieCtx.currentMovie?.type === "TopRated" && (
      <MovieDetail />
    ),
    detailActionMovies = movieCtx.currentMovie?.type === "ActionMovies" && (
      <MovieDetail />
    ),
    detailComedyMovies = movieCtx.currentMovie?.type === "ComedyMovies" && (
      <MovieDetail />
    ),
    detailHorrorMovies = movieCtx.currentMovie?.type === "HorrorMovies" && (
      <MovieDetail />
    ),
    detailRomanceMovies = movieCtx.currentMovie?.type === "RomanceMovies" && (
      <MovieDetail />
    ),
    detailDocumentaries = movieCtx.currentMovie?.type === "Documentaries" && (
      <MovieDetail />
    );
  //render Browse
  if (
    dataNetflixOriginals.results &&
    dataTrending.results &&
    dataTopRated.results &&
    dataActionMovies.results &&
    dataComedyMovies.results &&
    dataHorrorMovies.results &&
    dataRomanceMovies.results &&
    dataDocumentaries.results
  ) {
    return (
      <div className={classes.browse}>
        <NavBar />
        <Banner data={dataNetflixOriginals} />
        <MovieList
          data={dataNetflixOriginals}
          isBackdrop={false}
          type="Originals"
        />
        {detailOriginals}
        <div className={classes.inputNavContainer}>
          <h2 className={classes.title}>Xu hướng</h2>
          <div className={classes.page}>
            <input
              type="number"
              className={classes.pageinput}
              min={1}
              max={99}
              defaultValue={page.pageTrending}
              ref={inputRefTrending}
              onChange={handlerTrendingpage}
            />
            <span>/{dataTrending.total_pages} pages</span>
          </div>
        </div>
        <MovieList data={dataTrending} type="Trending" />
        {detailTrending}
        <div className={classes.inputNavContainer}>
          <h2 className={classes.title}>Xếp hạng cao</h2>
          <div className={classes.page}>
            <input
              type="number"
              className={classes.pageinput}
              min={1}
              max={99}
              defaultValue={page.pageTopRated}
              ref={inputRefTopRated}
              onChange={handlerTopRatedpage}
            />
            <span>/{dataTopRated.total_pages} pages</span>
          </div>
        </div>
        <MovieList data={dataTopRated} type="TopRated" />
        {detailTopRated}
        <div className={classes.inputNavContainer}>
          <h2 className={classes.title}>Hành động</h2>
          <div className={classes.page}>
            <input
              type="number"
              className={classes.pageinput}
              min={1}
              max={99}
              defaultValue={page.pageAction}
              ref={inputRefAction}
              onChange={handlerActionpage}
            />
            <span>/{dataActionMovies.total_pages} pages</span>
          </div>
        </div>
        <MovieList data={dataActionMovies} type="ActionMovies" />
        {detailActionMovies}
        <div className={classes.inputNavContainer}>
          <h2 className={classes.title}>Hài</h2>
          <div className={classes.page}>
            <input
              type="number"
              className={classes.pageinput}
              min={1}
              max={99}
              defaultValue={page.pageComedy}
              ref={inputRefComedy}
              onChange={handlerComedypage}
            />{" "}
            <span>/{dataComedyMovies.total_pages} pages</span>
          </div>
        </div>
        <MovieList data={dataComedyMovies} type="ComedyMovies" />
        {detailComedyMovies}
        <div className={classes.inputNavContainer}>
          <h2 className={classes.title}>Kinh dị</h2>
          <div className={classes.page}>
            <input
              type="number"
              className={classes.pageinput}
              min={1}
              max={99}
              defaultValue={page.pageHorror}
              ref={inputRefHorror}
              onChange={handlerHorrorpage}
            />{" "}
            <span>/{dataHorrorMovies.total_pages} pages</span>
          </div>
        </div>
        <MovieList data={dataHorrorMovies} type="HorrorMovies" />
        {detailHorrorMovies}
        <div className={classes.inputNavContainer}>
          <h2 className={classes.title}>Lãng mạn</h2>
          <div className={classes.page}>
            <input
              type="number"
              className={classes.pageinput}
              min={1}
              max={99}
              defaultValue={page.pageRomance}
              ref={inputRefRomance}
              onChange={handlerRomancepage}
            />
            <span>/{dataRomanceMovies.total_pages} pages</span>
          </div>
        </div>
        <MovieList data={dataRomanceMovies} type="RomanceMovies" />
        {detailRomanceMovies}
        <div className={classes.inputNavContainer}>
          <h2 className={classes.title}>Tài liệu</h2>
          <div className={classes.page}>
            <input
              type="number"
              className={classes.pageinput}
              min={1}
              max={99}
              defaultValue={page.pageDocument}
              ref={inputRefDocument}
              onChange={handlerDocumentpage}
            />
            <span>/{dataDocumentaries.total_pages} pages</span>
          </div>
        </div>
        <MovieList data={dataDocumentaries} type="Documentaries" />
        {detailDocumentaries}
      </div>
    );
  } else {
    return <p>Loading data...</p>;
  }
}

export default Browse;
