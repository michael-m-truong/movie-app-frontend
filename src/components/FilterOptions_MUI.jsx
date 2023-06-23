import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, Checkbox, Slider } from "@mui/material";
import "../assets/css/filter_mui.css";

const FilterOptions_MUI = () => {
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Update the query parameters in the URL
    const searchParams = new URLSearchParams(window.location.search);

    if (name === "genre") {
      const updatedGenres = selectedGenres.includes(value)
        ? selectedGenres.filter((genre) => genre !== value)
        : [...selectedGenres, value];

      setSelectedGenres(updatedGenres);
      searchParams.set(name, updatedGenres.join(","));
    } else {
      searchParams.set(name, value);
    }

    // Replace the current URL with the updated query parameters
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  return (
    <li className="nav-item">
      <div className="filter-options">
        <FormControl fullWidth>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            name="sort_by"
            onChange={handleFilterChange}
          >
            <MenuItem value="popularity.desc">Popularity Descending</MenuItem>
            <MenuItem value="popularity.asc">Popularity Ascending</MenuItem>
            <MenuItem value="vote_average.desc">Vote Average Descending</MenuItem>
            <MenuItem value="vote_count.desc">Vote Count Descending</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            name="genre"
            multiple
            value={selectedGenres}
            onChange={handleFilterChange}
            renderValue={(selected) => selected.join(", ")}
          >
            <MenuItem value="action">
              <Checkbox checked={selectedGenres.includes("action")} />
              Action
            </MenuItem>
            <MenuItem value="scary">
              <Checkbox checked={selectedGenres.includes("scary")} />
              Scary
            </MenuItem>
            {/* Add more genre options as needed */}
          </Select>
        </FormControl>

        <Slider
          defaultValue={30}
          step={10}
          marks
          min={10}
          max={110}
          valueLabelDisplay="auto"
          onChange={(event, value) => handleFilterChange({ target: { name: "vote_average.gte", value } })}
        />
      </div>
    </li>
  );
};

export default FilterOptions_MUI;
