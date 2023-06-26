import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/filter.css";
import { FormControl, InputLabel, MenuItem, Select, Checkbox, Slider, Chip, Button } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState, useRef } from "react";
import dayjs from 'dayjs';

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

const FilterOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortBy, setSortBy] = useState(""); // Initialize sortBy state
  const [earliestDate, setEarliestDate] = useState(null); // Initialize sortBy state
  const [latestDate, setLatestDate] = useState(null); // Initialize sortBy state
  const [selectedGenres, setSelectedGenres] = useState([]); // State for selected genres
  const [minVoteCount, setMinVoteCount] = useState(0)
  const [minScore, setMinScore] = useState(0);

  const handleFilterChange = (name, value) => {
    if (typeof name === 'object') {
      const { target } = name;
      name = target.name;
      value = target.value;
    }
    const searchParams = new URLSearchParams(window.location.search);
    if (name === "with_genres" && value == []) {
      searchParams.delete("with_genres")
    }
    else {
      searchParams.set(name, value);
    }
    navigate(`?${searchParams.toString()}`, { replace: true });
  };
  

  const handleGenreChipDelete = (genreId) => {
    let updatedGenres = selectedGenres.filter((genre) => genre !== genreId);
    console.log(genreId)
    if (!selectedGenres.includes(genreId)) {
      return
    }
    if (updatedGenres.toString() == [0].toString()) {
      updatedGenres = []
    }
    setSelectedGenres(updatedGenres);
    handleFilterChange("with_genres", updatedGenres.join(","));
  };

  const handleGenreChipClick = (genreId) => {
    console.log(selectedGenres)
    if (!selectedGenres.includes(genreId)) {
      setSelectedGenres([...selectedGenres, genreId]);
      handleFilterChange("with_genres", [...selectedGenres, genreId].join(","));
    }
  };

  const handleSliderChange = (event, value) => {
    setMinScore(value);
    handleFilterChange({ target: { name: "vote_average.gte", value } });
  };

  const handleVoteSliderChange = (event, value) => {
    setMinVoteCount(value);
    handleFilterChange({ target: { name: "vote_count.gte", value } });
  };
  
  const resetFilters = () => {
    setEarliestDate(null);
    setLatestDate(null);
    setSortBy("");
    setSelectedGenres([]);
    setMinScore(0);
    setMinVoteCount(0)
    navigate("", { replace: true });
  };

  useEffect(() => {
    const resetFilters = () => {
        setEarliestDate(null);
        setLatestDate(null);
        setSortBy("");
        setSelectedGenres([]);
        setMinScore(0);
        setMinVoteCount(0)
      };
    resetFilters()
    console.log("reset")
  }, [location]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
  const formattedLatestDate = searchParams.get("primary_release_date.lte") || "";
  const formattedEarliestDate = searchParams.get("primary_release_date.gte") || "";
  console.log(searchParams.get("primary_release_date.gte"))
  if (formattedEarliestDate) {
    setEarliestDate(dayjs(formattedEarliestDate));
  } else {
    setEarliestDate(null);
  }
  
  if (formattedLatestDate) {
    setLatestDate(dayjs(formattedLatestDate));
  } else {
    setLatestDate(null);
  }
    setSortBy(searchParams.get("sort_by") || "popularity.desc");
    setMinScore(Number(searchParams.get("vote_average.gte")) || 0);
    setMinVoteCount(Number(searchParams.get("vote_count.gte")) || 0);
    setSelectedGenres(
      searchParams.get("with_genres")?.split(",")?.map(Number) || []
    );
  }, [location]);

  return (
    <li className="nav-item">
      <div className="filter-options">
        <DatePicker label={'Earliest release date'} views={['year']} name="primary_release_date_gte" value={earliestDate} onChange={(date) => {
              let formattedDate = '';
              console.log(date)
              if (date) {
                formattedDate = date.toISOString().split('T')[0].slice(0, -5) + '01-01';
              }
              handleFilterChange("primary_release_date.gte", formattedDate);
            }}/>
        <DatePicker label={'Latest release date'} views={['year']} name="primary_release_date_lte" value={latestDate} onChange={(date) => {
              let formattedDate = '';
              if (date) {
                // Set day and month to '00'
                formattedDate = date.toISOString().split('T')[0].slice(0, -5) + '12-31';
              }
              handleFilterChange("primary_release_date.lte", formattedDate);
            }}/>
        <div className="slider-container">
          <div className="slider-label">Min Score</div>
          <Slider
            className="slider"
            value={minScore}
            onChange={handleSliderChange}
            step={1}
            defaultValue={0}
            marks
            min={0}
            max={10}
            valueLabelDisplay="auto"
          />
          <input
            type="number"
            className="slider-value"
            value={minScore}
            onChange={(event) => handleSliderChange(event, event.target.value)}
          />
        </div>
        <div className="slider-container">
          <div className="slider-label">Min Vote Count</div>
          <Slider
            className="slider"
            value={minVoteCount}
            onChange={handleVoteSliderChange}
            step={50}
            defaultValue={0}
            marks
            min={0}
            max={500}
            valueLabelDisplay="auto"
          />
          <input
            type="number"
            className="slider-value"
            value={minVoteCount}
            onChange={(event) => handleVoteSliderChange(event, event.target.value)}
          />
        </div>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortBy}
            label="Sort By"
            name="sort_by"
            onChange={(e) => {
              setSortBy(e.target.value);
              handleFilterChange(e);
            }}
          >
            <MenuItem value="popularity.desc">Popularity Descending</MenuItem>
            <MenuItem value="popularity.asc">Popularity Ascending</MenuItem>
            <MenuItem value="vote_average.desc">Vote Average Descending</MenuItem>
            <MenuItem value="vote_average.asc">Vote Average Ascending</MenuItem>
            <MenuItem value="vote_count.desc">Vote Count Descending</MenuItem>
            <MenuItem value="vote_count.asc">Vote Count Ascending</MenuItem>
            <MenuItem value="revenue.desc">Vote Count Descending</MenuItem>
            <MenuItem value="revenue.asc">Vote Count Ascending</MenuItem>
            <MenuItem value="primary_release_date.desc">Release Date Descending</MenuItem>
            <MenuItem value="primary_release_date.asc">Release Date Ascending</MenuItem>
          </Select>
        </FormControl>

        <div>
        {Object.entries(genreMappings)
    .sort(([, genreA], [, genreB]) => {
      const genreIdA = Object.keys(genreMappings).find((key) => genreMappings[key] === genreA);
      const genreIdB = Object.keys(genreMappings).find((key) => genreMappings[key] === genreB);

      const isSelectedA = selectedGenres.includes(Number(genreIdA));
      const isSelectedB = selectedGenres.includes(Number(genreIdB));

      if (isSelectedA && !isSelectedB) {
        return -1;
      } else if (!isSelectedA && isSelectedB) {
        return 1;
      } else {
        return genreA.localeCompare(genreB);
      }
    })
    .map(([genreId, genreName]) => (
      <Chip
        key={genreId}
        label={genreName}
        onClick={() => handleGenreChipClick(Number(genreId))}
        onDelete={() => handleGenreChipDelete(Number(genreId))}
        color={selectedGenres.includes(Number(genreId)) ? "primary" : undefined}
      />
    ))}
        </div>
        <Button variant="contained" color="primary" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </li>
  );
};

export default FilterOptions;
