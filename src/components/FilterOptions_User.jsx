import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/filter.css";
import { FormControl, InputLabel, MenuItem, Select, Checkbox, Slider, Chip, Button } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState, useRef } from "react";
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";

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

const FilterOptions_User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sortBy, setSortBy] = useState(""); // Initialize sortBy state
  const [earliestDate, setEarliestDate] = useState(null); // Initialize sortBy state
  const [latestDate, setLatestDate] = useState(null); // Initialize sortBy state
  const [selectedGenres, setSelectedGenres] = useState([]); // State for selected genres
  const [minYourScore, setMinYourScore] = useState(0)
  const [minScore, setMinScore] = useState(0);
  const favorites = useSelector(state => state.favorites.favorites);
  const ratings = useSelector(state => state.ratings.ratings);
  const watchlist = useSelector(state => state.watchlist.watchlist);
  const reminders = useSelector(state => state.reminders.reminders);
  const initialFilter = useRef(false);
  const [activeFilters, setActiveFilters] = useState([])
  const dispatch = useDispatch()

  console.log(favorites)
  console.log(minYourScore)

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
    setMinYourScore(value);
    handleFilterChange({ target: { name: "vote_count.gte", value } });
  };
  
  const resetFilters = () => {
    setEarliestDate(null);
    setLatestDate(null);
    setSortBy("");
    setSelectedGenres([]);
    setMinScore(0);
    setMinYourScore(0)
    navigate("", { replace: true });
  };

  useEffect(() => {
    const resetFilters = () => {
        setEarliestDate(null);
        setLatestDate(null);
        setSortBy("");
        setSelectedGenres([]);
        setMinScore(0);
        setMinYourScore(0)
      };
    resetFilters()
    console.log("reset")
  }, [location]);

  useEffect(() => {
    console.log(favorites)
    // if (initialFilter.current === true ) {
    //   console.log("here")
    //   return
    // }
    console.log(favorites)
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
    setSortBy(searchParams.get("sort_by") || "date_added.desc");
    setMinScore(Number(searchParams.get("vote_average.gte")) || 0);
    setMinYourScore(Number(searchParams.get("vote_count.gte")) || 0);
    setSelectedGenres(
      searchParams.get("with_genres")?.split(",")?.map(Number) || []
    );
    if (favorites.size != 0 && initialFilter.current == false) {
      console.log(favorites)
      filter_sortby()
      initialFilter.current = true
    }
  //filter_sortby()

  }, [location, favorites]);

  useEffect(() => {
    // Check if it's the first render
    console.log(favorites)
    // Check if favorites order has changed
    // if (favorites.size !=0 ) {
    //   filteredFavorites.current = true
    //   filter_sortby();
    // }
    // if (initialFavorites.current) {
    //   return
    // }
    // if (!mapKeysHaveSameOrder(initialFavorites.current, favorites)) {
    //   filter_sortby();
    //   return; 
    // }
    // if (initialFavorites.current === null && favorites != null && favorites.size != 0) {
    //   initialFavorites.current = favorites;
    //   return; // Skip the first run
    // }
    filter_sortby()
    // if (favorites.size != 0 && initialFilter.current == true) {
    //   console.log(favorites)
    //   filter_sortby()
    //   initialFilter.current = true
    // }

  }, [sortBy, minYourScore, minScore, selectedGenres.length, earliestDate?.toISOString().split('T')[0], latestDate?.toISOString().split('T')[0]]);

  const filter_sortby = () => {
    let filters = [];
    console.log(sortBy)
    console.log(minScore)
    if (sortBy === 'date_added.desc') {
      filters.push('FILTER_BY_DATE_DESCENDING');
    } else if (sortBy === 'date_added.asc') {
      filters.push('FILTER_BY_DATE_ASCENDING');
    } else if (sortBy === 'vote_average.desc') {
      filters.push('FILTER_BY_VOTE_AVERAGE_DESCENDING');
    } else if (sortBy === 'vote_average.asc') {
      filters.push('FILTER_BY_VOTE_AVERAGE_ASCENDING');
    } else if (sortBy === 'your_rating.desc') {
      filters.push('FILTER_BY_YOUR_RATING_DESCENDING');
    } else if (sortBy === 'your_rating.asc') {
      filters.push('FILTER_BY_YOUR_RATING_ASCENDING');
    } if (minYourScore !== 0) {
      filters.push('FILTER_BY_YOUR_RATING_MINIMUM');
    } 
    if (minScore !== 0) {
      filters.push('FILTER_BY_CRITIC_RATING_MINIMUM');
    } 
    if (selectedGenres.length !== 0) {
      filters.push('FILTER_BY_GENRE');
    }

    if (earliestDate !== null) {
      filters.push('FILTER_BY_EARLIEST_RELEASE_DATE');
    }
    
    if (latestDate !== null) {
      filters.push('FILTER_BY_LATEST_RELEASE_DATE');
    }
    const formattedEarliestDate = String(earliestDate?.toISOString().split('T')[0].slice(0, -5) + '01-01')
    const formattedLatestDate = String(latestDate?.toISOString().split('T')[0].slice(0, -5) + '12-31')
    console.log(new Date(formattedEarliestDate))
    console.log(getGenreNames(selectedGenres))
    dispatch({ type: 'FILTER', payload: [filters, minYourScore, minScore, getGenreNames(selectedGenres), new Date(formattedEarliestDate), new Date(formattedLatestDate)]});
  }

  const getGenreNames = (genreIds) => {
    if (!genreIds){
      return false
    }
    return genreIds
      .map((genreId) => genreMappings[genreId])
      .filter((genre) => genre); // Filter out undefined genres
  };
  // useEffect(() => {
  //   console.log(favorites)
  //   dispatch({ type: 'FILTER', payload: activeFilters });
  // }, [activeFilters]);

  const mapKeysHaveSameOrder = (map1, map2) => {

    // if (map1 == null || map2 == null) {
    //   return true
    // }

    const keys1 = Array.from(map1.keys());
    const keys2 = Array.from(map2.keys());


    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let i = 0; i < keys1.length; i++) {
      if (keys1[i] !== keys2[i]) {
        return false;
      }
    }

    return true;
  };

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
          <div className="slider-label">Critic Rating</div>
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
            value={minScore === 0 ? '' : minScore}
            placeholder="0"
            onChange={(event) => handleSliderChange(event, event.target.value)}
          />
        </div>
        <div className="slider-container">
          <div className="slider-label">Your Rating</div>
          <Slider
            className="slider"
            value={minYourScore}
            onChange={handleVoteSliderChange}
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
            value={minYourScore === 0 ? '' : minYourScore}
            placeholder="0"
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
            <MenuItem value="vote_average.desc">Vote Average Descending</MenuItem>
            <MenuItem value="vote_average.asc">Vote Average Ascending</MenuItem>
            <MenuItem value="date_added.desc">Date Added Descending</MenuItem>
            <MenuItem value="date_added.asc">Date Added Ascending</MenuItem>
            <MenuItem value="your_rating.desc">Your Rating Descending</MenuItem>
            <MenuItem value="your_rating.asc">Your Rating Ascending</MenuItem>
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

export default FilterOptions_User;
