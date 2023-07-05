import { useEffect, useState, useRef, Fragment } from "react";
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

export function Stats({routerPage}) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const modalRef = useRef(null);
  const [value, setValue] = useState(null);
  const [hover, setHover] = useState(-1);
  const favorites = useSelector(state => state.favorites.favorites);
  const ratings = useSelector(state => state.ratings.ratings);
  const watchlist = useSelector(state => state.watchlist.watchlist);
  const dispatch = useDispatch();

  useEffect(() => {
    
    const fetchStats= async () =>{
      try {
        const response = await api.movies.getStats()
        let movieStats = []
        movieStats.push(response.data.stats.mostFavoritedMovie.movies.movie)
        movieStats[0].count = response.data.stats.mostFavoritedMovie.movies.favoriteCount
        movieStats[0].stat = "Most favorited"

        movieStats.push(response.data.stats.mostWatchlistedMovie.movies.movie)
        movieStats[1].count = response.data.stats.mostWatchlistedMovie.movies.watchlistCount
        movieStats[1].stat = "Most watchlisted"

        movieStats.push(response.data.stats.mostRatedMovie.movieDetails)
        movieStats[2].count = response.data.stats.mostRatedMovie.ratingCount
        movieStats[2].stat = "Most rated"
        //const sortedMovies = response.data.results.sort((a, b) => b.vote_average - a.vote_average);
        //const parsedUrl = new URL(response.request?.responseURL);
        //parsedUrl.searchParams.delete("page");
        //const updatedUrl = parsedUrl.toString();
        //console.log(updatedUrl)
        //requestUrl_ref.current = updatedUrl
        //setRequestUrl(updatedUrl)
        setMovies(movieStats);
        console.log(movieStats)
      } catch (error) {
        console.log("Error fetching movie data:", error);
      }
    }

    fetchStats() 

    const updateListener = () => {
      fetchStats()
    };
    
    const eventSource = new EventSource('https://movie-app-backend-d7yq.onrender.com/movies/discover-stats-updates');
    eventSource.addEventListener("stats_updated", updateListener)
    return () => {
      eventSource.removeEventListener("update", updateListener);
      eventSource.close(); // Close the EventSource connection on component unmount
    };

  }, [])


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
        <Fragment key={movie.stat}>
        <div key={movie.stat } className="movie-card" onClick={() => openModal(movie)}>
        <br/>
        <div style={{ display: 'flex', textAlign: "left", flexDirection: 'column', justifyContent: 'center', alignItems: "center"}}>
        <h2 className="movie-stat-title" style={{ width: 'calc(50% - 20px)', margin: '20px 0' }}>{movie.stat}</h2>
        <h2 className="movie-stat-title" style={{ width: 'calc(50% - 20px)', margin: '20px 0' }}>{movie.count} users</h2>
        </div>
      </div>

        <div key={movie.movieId + " " + movie.stat } className="movie-card" onClick={() => openModal(movie)}>
          <img
            src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
            width={200}
          />
          <h2 className="movie-title">{movie.title}</h2>
        </div>
        </Fragment>
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
                        genre: selectedMovie?.genre_ids ? getGenreNames(selectedMovie.genre_ids) : selectedMovie.genre,
                        poster_path: selectedMovie.poster_path,
                        vote_average: selectedMovie.vote_average,
                        overview: selectedMovie.overview,
                        backdrop_path: selectedMovie.backdrop_path} });
                      if (value === null) {
                        await api.movies.add_rating(JSON.stringify({movieId: String((selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId)), ratingValue: newValue, title: selectedMovie.title,
                          genre: selectedMovie?.genre_ids ? getGenreNames(selectedMovie.genre_ids) : selectedMovie.genre,
                          poster_path: selectedMovie.poster_path,
                          overview: selectedMovie.overview,
                          vote_average: selectedMovie.vote_average,
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
          if (routerPage === "watchlist") {
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
                movieId: (selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId),
                genre: selectedMovie?.genre_ids ? getGenreNames(selectedMovie.genre_ids) : selectedMovie.genre,
                vote_average: selectedMovie.vote_average,
                poster_path: selectedMovie.poster_path,
                overview: selectedMovie.overview,
                backdrop_path: selectedMovie.backdrop_path
              })
            );
            dispatch({ type: 'ADD_WATCHLIST', payload: {
              title: selectedMovie.title,
              movieId: String((selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId)),
              genre: selectedMovie?.genre_ids ? getGenreNames(selectedMovie.genre_ids) : selectedMovie.genre,
              vote_average: selectedMovie.vote_average,
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
          if (routerPage === "favorites") {
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
                movieId: (selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId),
                genre: selectedMovie?.genre_ids ? getGenreNames(selectedMovie.genre_ids) : selectedMovie.genre,
                poster_path: selectedMovie.poster_path,
                overview: selectedMovie.overview,
                vote_average: selectedMovie.vote_average,
                backdrop_path: selectedMovie.backdrop_path
              })
            );
            dispatch({ type: 'ADD_FAVORITE', payload: {
              title: selectedMovie.title,
              movieId: String((selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId)),
              genre: selectedMovie?.genre_ids ? getGenreNames(selectedMovie.genre_ids) : selectedMovie.genre,
              poster_path: selectedMovie.poster_path,
              overview: selectedMovie.overview,
              vote_average: selectedMovie.vote_average,
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
          if (routerPage === "ratings") {
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