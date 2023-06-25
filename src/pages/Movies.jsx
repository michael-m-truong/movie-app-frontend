import { useEffect, useState, useRef } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import "../assets/css/movies.css";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { api } from "../axios/axiosConfig";
import { useSelector, useDispatch } from 'react-redux';


// Define the genre mappings
const genreMappings = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export function Movies({page}) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const modalRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1)
  const [requestUrl, setRequestUrl] = useState("")
  const [value, setValue] = useState(null);
  const [hover, setHover] = useState(-1);
  const favorites = useSelector(state => state.favorites.favorites);
  const ratings = useSelector(state => state.ratings.ratings);
  const watchlist = useSelector(state => state.watchlist.watchlist);
  const searchResults = useSelector(state => state.searchResults.searchResults)
  const dispatch = useDispatch();
  const location = useLocation()
  console.log(selectedMovie)
  //console.log(favorites.has(String(selectedMovie?.id)))
  console.log(page)
  console.log(searchResults)
  //console.log(favorites)

  useEffect(() => {
    const fetchData = async (type) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/${type}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`, // Replace with your actual bearer token
            },
            params: {
              api_key: "YOUR_API_KEY", // Replace with your actual API key
            },
          }
        );

        const sortedMovies = response.data.results.sort((a, b) => b.vote_average - a.vote_average);
        setRequestUrl(response.request?.responseURL)
        setMovies(sortedMovies);
        console.log(sortedMovies)
      } catch (error) {
        console.log("Error fetching movie data:", error);
      }
    };

    const fetchData_upcoming = async (type) => {
      try {
        const currentDate = new Date();
        const twoMonthsLater = new Date();
        twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

        const formattedCurrentDate = currentDate.toISOString().split("T")[0];
        const formattedTwoMonthsLater = twoMonthsLater.toISOString().split("T")[0];
        const response = await axios.get(
          `https://api.themoviedb.org/${type}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`, // Replace with your actual bearer token
            },
            params: {
              api_key: "YOUR_API_KEY", // Replace with your actual API key
              "primary_release_date.gte": formattedCurrentDate,
              "primary_release_date.lte": formattedTwoMonthsLater,
              "sort_by": "popularity.desc"
            },
          }
        );

        //const sortedMovies = response.data.results.sort((a, b) => b.vote_average - a.vote_average);
        //setMovies(sortedMovies);
        setRequestUrl(response.request?.responseURL)
        setMovies(response.data.results)
        console.log(sortedMovies)
      } catch (error) {
        console.log("Error fetching movie data:", error);
      }
    };

    const fetchData_discover = async (type) => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
    
        const currentDate = new Date();
        const twoMonthsLater = new Date();
        twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
    
        const formattedCurrentDate = currentDate.toISOString().split("T")[0];
        const formattedTwoMonthsLater = twoMonthsLater.toISOString().split("T")[0];

        const params = {
          "sort_by": searchParams.get("sort_by") || "popularity.desc"
        };

    const primaryReleaseDateGte = searchParams.get("primary_release_date.gte");
    const primaryReleaseDateLte = searchParams.get("primary_release_date.lte");
    const withGenres = searchParams.get("with_genres");
    const voteAverageGte = searchParams.get("vote_average.gte");

    if (primaryReleaseDateGte && !searchParams.get("sort_by")) {
      params["sort_by"] = "vote_average.desc"
    }
    if (primaryReleaseDateLte && !searchParams.get("sort_by")) {
      params["sort_by"] = "vote_average.desc"
    }
    

    console.log(primaryReleaseDateGte)

    if (primaryReleaseDateGte) {
      params["primary_release_date.gte"] = primaryReleaseDateGte;
    } 

    if (primaryReleaseDateLte) {
      params["primary_release_date.lte"] = primaryReleaseDateLte;
    }

    if (withGenres) {
      params["with_genres"] = withGenres;
    }

    if (voteAverageGte) {
      params["vote_average.gte"] = voteAverageGte;
    }

    params['vote_count.gte'] = 100
    
        const response = await axios.get(
          `https://api.themoviedb.org/${type}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`, // Replace with your actual bearer token
            },
            params: params
          }
        );
    
        // Process the response data
        // ...
        setRequestUrl(response.request?.responseURL)
        setMovies(response.data.results)
      } catch (error) {
        // Handle errors
        // ...
      }
    };

    if (page === undefined) {
      dispatch({ type: "CLEAR_SEARCH", payload: null });
      //document.getElementById("navbar")?.style.justifyContent = "space-between"
      fetchData_discover('3/discover/movie')
    }
    else if (page == 'now-playing') {
      dispatch({ type: "CLEAR_SEARCH", payload: null });
      //document.getElementById("navbar")?.style.justifyContent = "center"
      fetchData('3/movie/now_playing')
    }
    else if (page == 'upcoming') {
      dispatch({ type: "CLEAR_SEARCH", payload: null });
      //document.getElementById("navbar")?.style.justifyContent = "center"
      fetchData_upcoming('3/movie/upcoming')
    }
    else if (page == 'top-movies') {
      dispatch({ type: "CLEAR_SEARCH", payload: null });
      //document.getElementById("navbar")?.style.justifyContent = "center"
      fetchData('3/movie/top_rated')
    }
    else if (page == 'discover') {
      dispatch({ type: "CLEAR_SEARCH", payload: null });
      //document.getElementById("navbar")?.style.justifyContent = "space-between"
      fetchData_discover('3/discover/movie')
    }
    else if (page === "favorites") {
      console.log(favorites)
      console.log(ratings)
      console.log(Object.values(favorites))
      dispatch({ type: "CLEAR_SEARCH", payload: null });
      if (favorites) {
        const favoritesList = Array.from(favorites.values());
        console.log(favoritesList)
        setMovies(favoritesList);
      }
    }
    else if (page === "watchlist") {
      dispatch({ type: "CLEAR_SEARCH", payload: null });
      if (watchlist) {
        const watchlist_List = Array.from(watchlist.values());
        console.log(watchlist_List)
        setMovies(watchlist_List);
      }
    }
    else if (page === "ratings") {
      dispatch({ type: "CLEAR_SEARCH", payload: null });
      if (ratings) {
        const ratingsList = Array.from(ratings.values());
        console.log(ratingsList)
        setMovies(ratingsList);
      }
    }
    else if (page === "search") {
      console.log("NEW MOVIES")
      console.log(searchResults)
      if (searchResults) {
        console.log("huhfffffffffffffffffffffffffffffffff")
        setMovies(searchResults);
      }
    }
  }, [page, favorites, searchResults, watchlist, ratings, location]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // cleanup function
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(()=> {
    const loadMoreMovies = async () => {
      const response = await axios.get(
        requestUrl,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`, // Replace with your actual bearer token
          },
          params: {
            page: currentPage
          },
        }
      );
      setMovies([...movies, ...response.data?.results])
    }
    (currentPage != 1) && loadMoreMovies()
    console.log(currentPage)
  }, [currentPage])

  useEffect(()=> {
    const resetPageNum = () => setCurrentPage(1)
    resetPageNum()
  }, [requestUrl])

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.scrollY;
    if (windowBottom >= docHeight - 1) {
      setCurrentPage((page) => page + 1)
    }
  };

  const getLabelText = (value) => {
    if (value === null) return
    return `${value} Star${value !== 1 ? 's' : ''}`;
  };

  const getGenreNames = (genreIds) => {
    if (!genreIds){
      return false
    }
    return genreIds
      .map((genreId) => genreMappings[genreId])
      .filter((genre) => genre); // Filter out undefined genres
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    console.log(ratings)
    if (ratings?.has(String(movie?.id))) {
      console.log("HEREEEE")
      setValue(ratings.get(String(movie.id)).ratingValue)
    }
    else if (ratings?.has(String(movie?.movieId))) {
      setValue(ratings.get(String(movie.movieId)).ratingValue)
    }
    //send request to api to see if the movie is favorited, rated and watchlisted
    // based on that, display a different button
  };

  const closeModal = () => {
    const modalElement = modalRef.current;
    const overlayElement = document.getElementById("mod")
    console.log(overlayElement)
  //modalElement.style.animation = "fade-out 0.175s ease-out";
  overlayElement.style.animation = "fade-out 0.2s ease-out";
    console.log(modalElement)
  setTimeout(() => {
    setSelectedMovie(null);
    setValue(null)
    modalElement.style.animation = "";
  }, 160);
  };


  return (
    <>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id ? movie.id : movie.movieId } className="movie-card" onClick={() => openModal(movie)}>
            <img
              src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
              width={200}
            />
            <h2 className="movie-title">{movie.title}</h2>
          </div>
        ))}
      </div>

      {selectedMovie && (
  <div className="modal" onClick={closeModal} id="mod">
    <div
      className="modal-content"
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        className="modal-overlay"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Adjust the alpha value as needed
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />

      <button className="modal-close" onClick={closeModal}>
        X
      </button>

      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
          className="modal-poster"
        />
        <div className="movie-info">
          <h2>{selectedMovie?.title}</h2>
          <p>{selectedMovie?.overview}</p>
          <p>
                  Your rating:
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.1}
                    getLabelText={(value) => getLabelText(value)}
                    max={10}
                    onChange={async (event, newValue) => {
                      setValue(newValue);
                      dispatch({ type: 'ADD_RATING', payload: {movieId: String((selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId)), ratingValue: newValue, title: selectedMovie.title,
                        genre: getGenreNames(selectedMovie.genre_ids),
                        poster_path: selectedMovie.poster_path,
                        overview: selectedMovie.overview,
                        backdrop_path: selectedMovie.backdrop_path} });
                      if (value === null) {
                        await api.movies.add_rating(JSON.stringify({movieId: String((selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId)), ratingValue: newValue, title: selectedMovie.title,
                          genre: getGenreNames(selectedMovie.genre_ids),
                          poster_path: selectedMovie.poster_path,
                          overview: selectedMovie.overview,
                          backdrop_path: selectedMovie.backdrop_path}))
                      }
                      else {
                        await api.movies.edit_rating(JSON.stringify({movieId: String((selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId)), ratingValue: newValue}))
                      }
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 1. }} fontSize="inherit" />
                    }
                  />
                  {(
                    <Box sx={{ ml: 2 }}>
                      {getLabelText(hover !== -1 ? hover : value)}
                    </Box>
                  )}
                </p>
          <p>Critic ratings: {selectedMovie?.vote_average}</p>
          <p>Genres: {selectedMovie?.genre_ids ? getGenreNames(selectedMovie.genre_ids).join(", ") : selectedMovie?.genre?.join(", ")}</p>
        </div>
      </div>

      <div className="modal-actions">
        
      {(watchlist?.has(String(selectedMovie.id)) || watchlist?.has(String(selectedMovie.movieId)) ) ? (
        <Button variant="contained" className="modal-action-button"
        onClick={() => {
          api.movies.remove_watchlist(
            JSON.stringify({
              movieId: (selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId),
            })
          )
          dispatch({ type: 'REMOVE_WATCHLIST', payload: {movieId: String((selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId))} });
          if (page === "watchlist") {
            closeModal()
          }
        }}>
          Remove from watchlist
        </Button>
      ) : (
        <Button
          variant="contained"
          className="modal-action-button"
          onClick={() => {
            api.movies.add_watchlist(
              JSON.stringify({
                title: selectedMovie.title,
                movieId: selectedMovie.id,
                genre: getGenreNames(selectedMovie.genre_ids),
                poster_path: selectedMovie.poster_path,
                overview: selectedMovie.overview,
                backdrop_path: selectedMovie.backdrop_path
              })
            );
            dispatch({ type: 'ADD_WATCHLIST', payload: {
              title: selectedMovie.title,
              movieId: String(selectedMovie.id),
              genre: getGenreNames(selectedMovie.genre_ids),
              poster_path: selectedMovie.poster_path,
              overview: selectedMovie.overview,
              backdrop_path: selectedMovie.backdrop_path
            } });
            }}
        >
          Add to watchlist
        </Button>
      )}
        
        {(favorites?.has(String(selectedMovie.id)) || favorites?.has(String(selectedMovie.movieId)) ) ? (
        <Button variant="contained" className="modal-action-button"
        onClick={() => {
          api.movies.remove_favorite(
            JSON.stringify({
              movieId: (selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId),
            })
          )
          dispatch({ type: 'REMOVE_FAVORITE', payload: {movieId: String((selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId))} });
          if (page === "favorites") {
            closeModal()
          }
        }}>
          Unfavorite
        </Button>
      ) : (
        <Button
          variant="contained"
          className="modal-action-button"
          onClick={() => {
            api.movies.add_favorite(
              JSON.stringify({
                title: selectedMovie.title,
                movieId: selectedMovie.id,
                genre: getGenreNames(selectedMovie.genre_ids),
                poster_path: selectedMovie.poster_path,
                overview: selectedMovie.overview,
                backdrop_path: selectedMovie.backdrop_path
              })
            );
            dispatch({ type: 'ADD_FAVORITE', payload: {
              title: selectedMovie.title,
              movieId: String(selectedMovie.id),
              genre: getGenreNames(selectedMovie.genre_ids),
              poster_path: selectedMovie.poster_path,
              overview: selectedMovie.overview,
              backdrop_path: selectedMovie.backdrop_path
            } });
            }}
        >
          Favorite
        </Button>
      )}

      {(ratings?.has(String(selectedMovie.id)) || ratings?.has(String(selectedMovie.movieId)) ) ? (
        <Button variant="contained" className="modal-action-button"
        onClick={() => {
          api.movies.remove_rating(
            JSON.stringify({
              movieId: (selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId),
            })
          )
          dispatch({ type: 'REMOVE_RATING', payload: {movieId: String((selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId))} });
          if (page === "ratings") {
            closeModal()
          }
        }}>
          Remove Rating
        </Button>
      ) : (
        null
      )}

        </div> 
    </div>
  </div>
)}
    </>
  );
}//add release date under poster