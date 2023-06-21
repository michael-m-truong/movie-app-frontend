import { Link } from "react-router-dom";
import "../assets/css/header.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {  useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"


export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  const searchResults = useSelector(state => state.searchResults.searchResults)
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    // Update the URL with the search query
    navigate(`/search?title=${searchQuery}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Get the search query from the URL parameters
      const searchTitle = new URLSearchParams(window.location.search).get("title");
      console.log(searchTitle)
      if (searchTitle) {
        try {
          console.log("here")
          const response = await axios.get(
            "https://api.themoviedb.org/3/search/movie",
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`, // Replace with your actual bearer token
              },
              params: {
                query: searchTitle,
                include_adult: false,
                language: 'en-US',
                page: 1,
              },
            }
          );
          // Dispatch the search results to Redux store
          dispatch({ type: "INITIALIZE_SEARCH_RESULTS", payload: response.data.results });
          console.log(response)
        } catch (error) {
          console.log("Error fetching movie data:", error);
        }
      }
    }
    fetchData()
  }, );

  useEffect(() => {
    if (searchResults === null) return
    setSearchQuery("");
  }, [location.pathname]);

  return (
    <div className="header">
      <Link to="/" className="header-title">
        Movie App
      </Link>
      <form onSubmit={handleSearch} className="header-search">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
}
