import { useEffect, useState, useRef } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import "../assets/movies.css";

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

export function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing",
          {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZGQ5NTQyMTFkN2I4MGVhM2FlMmFlZjhlZDU3NTQ2OCIsInN1YiI6IjYxMTBiOWEwNGE1MmY4MDA1Y2M3MTMwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EABEQGSe71SPwD2QSuf1sp3HgPk1CCavgemuXf6cxlg", // Replace with your actual bearer token
            },
            params: {
              api_key: "YOUR_API_KEY", // Replace with your actual API key
            },
          }
        );

        const sortedMovies = response.data.results.sort((a, b) => b.vote_average - a.vote_average);
        setMovies(sortedMovies);
      } catch (error) {
        console.log("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, []);

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((genreId) => genreMappings[genreId])
      .filter((genre) => genre); // Filter out undefined genres
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card" onClick={() => openModal(movie)}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h2 className="movie-title">{movie.title}</h2>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()} 
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          }}>
            <div
        className="modal-overlay"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Adjust the alpha value as needed
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1
        }}
      />
          
            <div className="movie-details">
              <img
                src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                className="modal-poster"
              />
              <div className="movie-info">
                <h2>{selectedMovie.title}</h2>
                <p>{selectedMovie.overview}</p>
                <p>Ratings: {selectedMovie.vote_average}</p>
                <p>Genres: {getGenreNames(selectedMovie.genre_ids).join(", ")}</p>
              </div>
            </div>
            <button className="modal-close" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
