import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/navbar.css";
import { store } from '../App';
import { api } from "../axios/axiosConfig";
import FilterOptions from "../components/FilterOptions";
import FilterOptions_MUI from "../components/FilterOptions_MUI";

export function Navbar() {
  const location = useLocation();
  const isDiscoverPage = location.pathname === '/discover' || location.pathname === '/' || location.pathname === '/watchlist' || location.pathname === '/ratings' || location.pathname === '/favorites' || location.pathname === '/reminders';

  return (
    <div className="navbar" id="navbar">
      <ul className="nav-list">
      {isDiscoverPage && <FilterOptions />}
        {/* <li className="nav-item">
          <Link to="/discover" className="nav-link">
            Discover
          </Link>
        </li> */}
        {/* <li className="nav-item">
          <Link to="/top-movies" className="nav-link">
            Top Movies
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/upcoming" className="nav-link">
            Upcoming
          </Link>
        </li> */}
        {/* {isLoggedIn ? (
          <AuthenticatedLinks />
        ) : (
          <UnauthenticatedLinks />
        )} */}
      </ul>
    </div>
  );
}

const AuthenticatedLinks = () => (
  <>
  <li className="nav-item nav-link" onClick={logout}>
    Signout
    {/* <Link to="/logout" className="nav-link">
      Sign Out
    </Link> */}
  </li>
  <li className="nav-item">
  <Link to="/watchlist" className="nav-link">
    My Watch List
  </Link>
</li>
<li className="nav-item">
  <Link to="/favorites" className="nav-link">
    My Favorites
  </Link>
</li>
<li className="nav-item">
  <Link to="/ratings" className="nav-link">
    My Ratings
  </Link>
</li>
</>
);

const UnauthenticatedLinks = () => (
  <>
    <li className="nav-item">
      <Link to="/login" className="nav-link">
        Log In
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/register" className="nav-link">
        Register
      </Link>
    </li>
  </>
);


const logout = async () => {
    await store.dispatch({ type: "LOGGED_OUT"})
    await api.auth.logout()
}


