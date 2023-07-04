const initialState = {
    watchlist: new Map(),
	originalWatchlist: new Map()
  };
  
  const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
      	case 'INITIALIZE_WATCHLIST':
			if (state.watchlist.size !== 0) {  //need this bc it renders twice for some rzn
				return {
					...state
				}
			}
			console.log(action.payload)
			return {
				...state,
				watchlist: new Map(action.payload), // Initialize watchlists with the provided Map
				originalWatchlist: new Map(action.payload)
			};
		case 'UPDATE_OTHER_LISTS_WITH_RATINGS':
			console.log("hereeeeeee")
			const ratings = new Map(action.payload);
			const updatedWatchlist = new Map(state.watchlist);
		
			ratings.forEach((rating, movieId) => {
				if (updatedWatchlist.has(movieId)) {
				const watchlist = updatedWatchlist.get(movieId);
				watchlist.ratingValue = rating.ratingValue;
				}
			});
		
			return {
				...state,
				watchlist: updatedWatchlist,
				originalWatchlist: updatedWatchlist
			};
		case 'UPDATE_OTHER_LISTS_WITH_RATING':
			const { movieId, ratingValue } = action.payload;
		
			if (state.watchlist.has(movieId)) {
				const updatedWatchlist = new Map(state.watchlist);
				const watchlist = updatedWatchlist.get(movieId);
				watchlist.ratingValue = ratingValue;
		
				return {
				...state,
				watchlist: updatedWatchlist,
				originalWatchlist: updatedWatchlist
				};
			}
		
			return state;
		case 'REMOVE_RATING_FROM_OTHER_LISTS':
			const movieIdToRemove = action.payload;
		
			if (state.watchlist.has(movieIdToRemove)) {
				const updatedWatchlist = new Map(state.watchlist);
				const watchlist = updatedWatchlist.get(movieIdToRemove);
				delete watchlist.ratingValue;
		
				return {
				...state,
				watchlist: updatedWatchlist,
				originalWatchlist: updatedWatchlist
				};
			}
      	case 'ADD_WATCHLIST':
			console.log(action.payload)
        	return {
            	...state,
            	watchlist: new Map(state.watchlist).set(action.payload.movieId, action.payload), // Add the new watchlist movie to the Map
				originalWatchlist: new Map(state.watchlist).set(action.payload.movieId, action.payload)
        	};
      	case 'REMOVE_WATCHLIST':
			console.log("here")
			const newWatchlist = new Map(state.watchlist);
			newWatchlist.delete(action.payload.movieId); // Remove the watchlist movie with the specified movieId from the Map
			return {
				...state,
				watchlist: newWatchlist,
				originalWatchlist: newWatchlist
			};
		case 'FILTER':
			console.log(state.watchlist)
			let filteredWatchlist = new Map(state.originalWatchlist);
			let [filters, minYourScore, minScore, selectedGenres, earliestDate, latestDate, locationPathname] = action.payload
			console.log(locationPathname)
			if (locationPathname != '/watchlist') {
				return {
					...state
				}
			}
			filters.forEach((filter) => {
				switch (filter) {
				case 'FILTER_BY_DATE_ASCENDING':
					filteredWatchlist = new Map([...filteredWatchlist.entries()].sort((a, b) => {
						return new Date(a[1].dateAdded) - new Date(b[1].dateAdded);
					}));
					break;
				case 'FILTER_BY_DATE_DESCENDING':
					console.log(filteredWatchlist)
					filteredWatchlist = new Map([...filteredWatchlist.entries()].sort((a, b) => {
						console.log(new Date(b[1].dateAdded))
						console.log(new Date(a[1].dateAdded))
						return new Date(b[1].dateAdded) - new Date(a[1].dateAdded);
					}));
					break;
				case 'FILTER_BY_VOTE_AVERAGE_ASCENDING':
					filteredWatchlist = new Map([...filteredWatchlist.entries()].sort((a, b) => {
						return a[1].vote_average - b[1].vote_average;
					}));
					break;
				case 'FILTER_BY_VOTE_AVERAGE_DESCENDING':
					filteredWatchlist = new Map([...filteredWatchlist.entries()].sort((a, b) => {
						return b[1].vote_average - a[1].vote_average;
					}));
					break;
				case 'FILTER_BY_YOUR_RATING_ASCENDING':
					filteredWatchlist = new Map([...filteredWatchlist.entries()]
						.filter(([_, movie]) => movie.ratingValue)
						.sort((a, b) => {
							return a[1].ratingValue - b[1].ratingValue;
						})
					);
					break;
				case 'FILTER_BY_YOUR_RATING_DESCENDING':
					filteredWatchlist = new Map([...filteredWatchlist.entries()]
						.filter(([_, movie]) => movie.ratingValue)
						.sort((a, b) => {
							return b[1].ratingValue - a[1].ratingValue;
					})
					);
					break;
				case 'FILTER_BY_YOUR_RATING_MINIMUM':
					console.log(minYourScore)
					filteredWatchlist = new Map([...filteredWatchlist.entries()]
						.filter(([_, movie]) => (movie.ratingValue  && movie.ratingValue >= minYourScore))
					);
					break;
				case 'FILTER_BY_CRITIC_RATING_MINIMUM':
					console.log(minScore)
					filteredWatchlist = new Map([...filteredWatchlist.entries()]
						.filter(([_, movie]) => (movie.vote_average >= minScore))
					);
					break;
				case 'FILTER_BY_GENRE':
					console.log(selectedGenres);
					filteredWatchlist = new Map([...filteredWatchlist.entries()]
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
					filteredWatchlist = new Map([...filteredWatchlist.entries()].filter(([_, movie]) => {
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
					filteredWatchlist = new Map([...filteredWatchlist.entries()].filter(([_, movie]) => {
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
			console.log(filteredWatchlist)
			console.log(action.payload)
			return {
				...state,
				watchlist: filteredWatchlist,
				activeFilters: action.payload,
			};
		case 'RESET_FILTERS':
			return {
				...state,
				watchlist: new Map(state.originalWatchlist),
				activeFilters: [],
			};
		default:
			return state;
		}
  	};
  
export default watchlistReducer;
  