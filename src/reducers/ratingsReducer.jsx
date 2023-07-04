const initialState = {
    ratings: new Map(),
	originalRatings: new Map()
  };
  
  const ratingsReducer = (state = initialState, action) => {
    switch (action.type) {
      	case 'INITIALIZE_RATINGS':
			if (state.ratings.size !== 0) {  //need this bc it renders twice for some rzn
				return {
					...state
				}
			}
			console.log(action.payload)
			return {
				...state,
				ratings: new Map(action.payload), // Initialize ratings with the provided Map
				originalRatings: new Map(action.payload)
			};
      	case 'ADD_RATING':
			console.log(action.payload)
        	return {
            	...state,
            	ratings: new Map(state.ratings).set(action.payload.movieId, action.payload), // Add the new rating movie to the Map
				originalRatings: new Map(state.ratings).set(action.payload.movieId, action.payload)
        	};
      	case 'REMOVE_RATING':
			console.log("here")
			const newRatings = new Map(state.ratings);
			newRatings.delete(action.payload.movieId); // Remove the rating movie with the specified movieId from the Map
			return {
				...state,
				ratings: newRatings,
				originalRatings: newRatings
			};
		case 'FILTER':
			console.log(state.ratings)
			let filteredRatings = new Map(state.originalRatings);
			let [filters, minYourScore, minScore, selectedGenres, earliestDate, latestDate, locationPathname] = action.payload
			if (locationPathname != '/ratings') {
				return {
					...state
				}
			}
			filters.forEach((filter) => {
				switch (filter) {
				case 'FILTER_BY_DATE_ASCENDING':
					filteredRatings = new Map([...filteredRatings.entries()].sort((a, b) => {
						return new Date(a[1].dateAdded) - new Date(b[1].dateAdded);
					}));
					break;
				case 'FILTER_BY_DATE_DESCENDING':
					console.log(filteredRatings)
					filteredRatings = new Map([...filteredRatings.entries()].sort((a, b) => {
						console.log(new Date(b[1].dateAdded))
						console.log(new Date(a[1].dateAdded))
						return new Date(b[1].dateAdded) - new Date(a[1].dateAdded);
					}));
					break;
				case 'FILTER_BY_VOTE_AVERAGE_ASCENDING':
					filteredRatings = new Map([...filteredRatings.entries()].sort((a, b) => {
						return a[1].vote_average - b[1].vote_average;
					}));
					break;
				case 'FILTER_BY_VOTE_AVERAGE_DESCENDING':
					filteredRatings = new Map([...filteredRatings.entries()].sort((a, b) => {
						return b[1].vote_average - a[1].vote_average;
					}));
					break;
				case 'FILTER_BY_YOUR_RATING_ASCENDING':
					filteredRatings = new Map([...filteredRatings.entries()]
						.filter(([_, movie]) => movie.ratingValue)
						.sort((a, b) => {
							return a[1].ratingValue - b[1].ratingValue;
						})
					);
					break;
				case 'FILTER_BY_YOUR_RATING_DESCENDING':
					filteredRatings = new Map([...filteredRatings.entries()]
						.filter(([_, movie]) => movie.ratingValue)
						.sort((a, b) => {
							return b[1].ratingValue - a[1].ratingValue;
					})
					);
					break;
				case 'FILTER_BY_YOUR_RATING_MINIMUM':
					console.log(minYourScore)
					filteredRatings = new Map([...filteredRatings.entries()]
						.filter(([_, movie]) => (movie.ratingValue  && movie.ratingValue >= minYourScore))
					);
					break;
				case 'FILTER_BY_CRITIC_RATING_MINIMUM':
					console.log(minScore)
					filteredRatings = new Map([...filteredRatings.entries()]
						.filter(([_, movie]) => (movie.vote_average >= minScore))
					);
					break;
				case 'FILTER_BY_GENRE':
					console.log(selectedGenres);
					filteredRatings = new Map([...filteredRatings.entries()]
						.filter(([_, movie]) => {
						// Check if the movie has all the genres from the selectedGenres array
						const movieGenres = movie.genre
						console.log(movieGenres)
						return selectedGenres.every(genre => movieGenres.includes(genre));
						})
					);
					break;
				case 'FILTER_BY_EARLIEST_RELEASE_DATE':
					console.log(earliestDate);
					filteredRatings = new Map([...filteredRatings.entries()].filter(([_, movie]) => {
						const releaseDate = new Date(movie.release_date);
						console.log(latestDate)
						if (earliestDate) {
						return releaseDate >= earliestDate;
						}
						return true; // No earliest date filter applied
					}));
					break;
					
					case 'FILTER_BY_LATEST_RELEASE_DATE':
					console.log(latestDate);
					filteredRatings = new Map([...filteredRatings.entries()].filter(([_, movie]) => {
						const releaseDate = new Date(movie.release_date);
						console.log(releaseDate <= latestDate)
						if (latestDate) {
						return releaseDate <= latestDate;
						}
						return true; // No latest date filter applied
					}));
					break;
				default:
					break;
				}
			});
			console.log(filteredRatings)
			console.log(action.payload)
			return {
				...state,
				ratings: filteredRatings,
				activeFilters: action.payload,
			};
		case 'RESET_FILTERS':
		return {
			...state,
			ratings: new Map(state.originalRatings),
			activeFilters: [],
		};
		default:
			return state;
		}
  	};
  
export default ratingsReducer;
  