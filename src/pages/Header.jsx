import { Link } from "react-router-dom";
import "../assets/css/header.css";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import {  useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom"
import { store } from '../App';
import { api } from "../axios/axiosConfig";


export function Header({ authUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  const location = useLocation();
  const searchResults = useSelector(state => state.searchResults.searchResults)
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const handleSearch = (e) => {
    e.preventDefault();
    // Update the URL with the search query
    navigate(`/search?title=${searchQuery}`);
  };

  useEffect(() => {
    // Remove the 'selected' class from all nav items
    //console.log("here")
    const navItems = document.getElementsByClassName("nav-item");
    for (let i = 0; i < navItems.length; i++) {
      navItems[i].classList.remove("selected");
    }

    // Add the 'selected' class to the nav item matching the current location
    console.log(location.pathname)
    if (location.pathname === '/') {
      return
    }
    const currentItem = document.querySelector(`.nav-item a[href="${location.pathname}"]`);
    console.log(currentItem)
    //console.log(currentItem)
    if (currentItem) {
      currentItem.parentElement.classList.add("selected");
    }
  }, );

  useEffect(() => {
    const fetchData = async () => {
      // Get the search query from the URL parameters
      const searchTitle = new URLSearchParams(window.location.search).get("title");
      //console.log(searchTitle)
      if (searchTitle) {
        try {
          //console.log("here")
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
          //console.log(response)
        } catch (error) {
          //console.log("Error fetching movie data:", error);
        }
      }
    }
    fetchData()
  }, [window.location.search]);

  useEffect(() => {
    //console.log("here")
    if (searchResults === null) return
    setSearchQuery("");
  }, [location.pathname]);

  return (
    <div className="header">
      <Link to="/" className="header-title">
        Movie App
      </Link>
     
        <li className="nav-item top">
          <Link to="/now-playing" className="nav-link">
            Now Playing
          </Link>
        </li>
        <li className="nav-item top">
          <Link to="/top-movies" className="nav-link">
            Top Movies
          </Link>
        </li>
        <li className="nav-item top">
          <Link to="/upcoming" className="nav-link">
            Upcoming
          </Link>
        </li>
        <li className="nav-item top">
          <Link to="/discover" className="nav-link">
            Discover
          </Link>
        </li>

        {isLoggedIn ? (
          <AuthenticatedLinks />
        ) : (
          <UnauthenticatedLinks />
        )}
        
        
      
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

const AuthenticatedLinks = () => {
  const [isHovered, setIsHovered] = useState([]);

  const handleMouseEnter = (type) => {
    if (type === 'lists') {
      setIsHovered((state) => [true, state[1]]);
    }
    else if (type === 'profile') {
      setIsHovered((state) => [state[0], true]);
    }
  };

  const handleMouseLeave = (type) => {
    if (type === 'lists') {
      setIsHovered((state) => [false, state[1]]);
    }
    else if (type === 'profile') {
      setIsHovered((state) => [state[0], false]);
    }
  };

  const navigate = useNavigate()

  const logout = async () => {
    await store.dispatch({ type: "LOGGED_OUT"})
    await api.auth.logout()
    navigate('/')
}

  return (
    <>
      <li
        className={`nav-item top ${isHovered[0] ? "show-dropdown" : ""}`}
        onMouseEnter={() => handleMouseEnter("lists")}
        onMouseLeave={() => handleMouseLeave("lists")}
      >
        <span className="nav-link">My Lists</span>
        <div className={`dropdown-menu ${isHovered[0] ? "show" : ""}`}>
          <ul className="dropdown-list">
            <li className="nav-item top">
              <Link to="/watchlist" className="dropdown-link">
                My Watch List
              </Link>
            </li>
            <li className="nav-item top">
              <Link to="/favorites" className="dropdown-link">
                My Favorites
              </Link>
            </li>
            <li className="nav-item top">
              <Link to="/ratings" className="dropdown-link">
                My Ratings
              </Link>
            </li>
            <li className="nav-item top">
              <Link to="/reminders" className="dropdown-link">
                My Reminders
              </Link>
            </li>
          </ul>
        </div>
      </li>

      <li
        className={`nav-item top ${isHovered[1] ? "show-dropdown" : ""}`}
        onMouseEnter={() => handleMouseEnter("profile")}
        onMouseLeave={() => handleMouseLeave("profile")}
      >
        <span className="nav-link">Profile</span>
        <div className={`dropdown-menu ${isHovered[1] ? "show" : ""}`}>
          <ul className="dropdown-list">
          <li className="nav-item top">
              <Link to="/edit-profile" className="dropdown-link">
                Edit profile
              </Link>
            </li>
            <li className="nav-item top"  onClick={logout}>
              <Link to="/" className="dropdown-link">
                Sign out
              </Link>
            </li>
            
          </ul>
        </div>
      </li>

    </>
  );
};

const UnauthenticatedLinks = () => (
  <>
    <li className="nav-item top">
      <Link to="/login" className="nav-link">
        Log In
      </Link>
    </li>
    <li className="nav-item top">
      <Link to="/register" className="nav-link">
        Register
      </Link>
    </li>
  </>
);

