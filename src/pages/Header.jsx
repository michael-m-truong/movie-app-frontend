import { Link } from "react-router-dom";
import "../assets/css/header.css";
import { useState } from "react";


export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform the search action using the searchQuery value
    console.log("Searching for:", searchQuery);
  };

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
