const initialState = {
    favorites: new Map(),
	originalFavorites: new Map()
  };
  
  const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      	case 'INITIALIZE_FAVORITES':
			if (state.originalFavorites.size !== 0) {  //need this bc it renders twice for some rzn
				return {
					...state
				}
			}
			console.log(action.payload)
			return {
				...state,
				favorites: new Map(action.payload), // Initialize favorites with the provided Map
				originalFavorites: new Map(action.payload)
			};
		case 'UPDATE_FAVORITES_WITH_RATINGS':
			const ratings = new Map(action.payload);
			const updatedFavorites = new Map(state.favorites);
		
			ratings.forEach((rating, movieId) => {
				if (updatedFavorites.has(movieId)) {
				const favorite = updatedFavorites.get(movieId);
				favorite.ratingValue = rating.ratingValue;
				}
			});
		
			return {
				...state,
				favorites: updatedFavorites,
			};
		case 'UPDATE_FAVORITE_WITH_RATING':
			const { movieId, ratingValue } = action.payload;
		
			if (state.favorites.has(movieId)) {
				const updatedFavorites = new Map(state.favorites);
				const favorite = updatedFavorites.get(movieId);
				favorite.ratingValue = ratingValue;
		
				return {
				...state,
				favorites: updatedFavorites,
				};
			}
		
			return state;
		case 'REMOVE_RATING_FROM_FAVORITES':
			const movieIdToRemove = action.payload;
		
			if (state.favorites.has(movieIdToRemove)) {
				const updatedFavorites = new Map(state.favorites);
				const favorite = updatedFavorites.get(movieIdToRemove);
				delete favorite.ratingValue;
		
				return {
				...state,
				favorites: updatedFavorites,
				};
			}
		
			return state;
      	case 'ADD_FAVORITE':
			console.log(action.payload)
        	return {
            	...state,
            	favorites: new Map(state.favorites).set(action.payload.movieId, action.payload), // Add the new favorite movie to the Map
				originalFavorites: new Map(state.originalFavorites).set(action.payload.movieId, action.payload),
        	};
      	case 'REMOVE_FAVORITE':
			console.log("here")
			const newFavorites = new Map(state.favorites);
			newFavorites.delete(action.payload.movieId); // Remove the favorite movie with the specified movieId from the Map
			return {
				...state,
				favorites: newFavorites,
				originalFavorites: newFavorites,
			};
		case 'FILTER':
			console.log(state.favorites)
			let filteredFavorites = new Map(state.originalFavorites);
			let [filters, minYourScore, minScore, selectedGenres, earliestDate, latestDate] = action.payload
			filters.forEach((filter) => {
				switch (filter) {
				case 'FILTER_BY_DATE_ASCENDING':
					filteredFavorites = new Map([...filteredFavorites.entries()].sort((a, b) => {
						return new Date(a[1].dateAdded) - new Date(b[1].dateAdded);
					}));
					break;
				case 'FILTER_BY_DATE_DESCENDING':
					console.log(filteredFavorites)
					filteredFavorites = new Map([...filteredFavorites.entries()].sort((a, b) => {
						console.log(new Date(b[1].dateAdded))
						console.log(new Date(a[1].dateAdded))
						return new Date(b[1].dateAdded) - new Date(a[1].dateAdded);
					}));
					break;
				case 'FILTER_BY_VOTE_AVERAGE_ASCENDING':
					filteredFavorites = new Map([...filteredFavorites.entries()].sort((a, b) => {
						return a[1].vote_average - b[1].vote_average;
					}));
					break;
				case 'FILTER_BY_VOTE_AVERAGE_DESCENDING':
					filteredFavorites = new Map([...filteredFavorites.entries()].sort((a, b) => {
						return b[1].vote_average - a[1].vote_average;
					}));
					break;
				case 'FILTER_BY_YOUR_RATING_ASCENDING':
					filteredFavorites = new Map([...filteredFavorites.entries()]
						.filter(([_, movie]) => movie.ratingValue)
						.sort((a, b) => {
							return a[1].ratingValue - b[1].ratingValue;
						})
					);
					break;
				case 'FILTER_BY_YOUR_RATING_DESCENDING':
					filteredFavorites = new Map([...filteredFavorites.entries()]
						.filter(([_, movie]) => movie.ratingValue)
						.sort((a, b) => {
							return b[1].ratingValue - a[1].ratingValue;
					})
					);
					break;
				case 'FILTER_BY_YOUR_RATING_MINIMUM':
					console.log(minYourScore)
					filteredFavorites = new Map([...filteredFavorites.entries()]
						.filter(([_, movie]) => (movie.ratingValue  && movie.ratingValue >= minYourScore))
					);
					break;
				case 'FILTER_BY_CRITIC_RATING_MINIMUM':
					console.log(minScore)
					filteredFavorites = new Map([...filteredFavorites.entries()]
						.filter(([_, movie]) => (movie.vote_average >= minScore))
					);
					break;
				case 'FILTER_BY_GENRE':
					console.log(selectedGenres);
					filteredFavorites = new Map([...filteredFavorites.entries()]
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
					filteredFavorites = new Map([...filteredFavorites.entries()].filter(([_, movie]) => {
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
					filteredFavorites = new Map([...filteredFavorites.entries()].filter(([_, movie]) => {
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
			console.log(filteredFavorites)
			console.log(action.payload)
			return {
				...state,
				favorites: filteredFavorites,
				activeFilters: action.payload,
			};
		case 'RESET_FILTERS':
		return {
			...state,
			favorites: new Map(state.originalFavorites),
			activeFilters: [],
		};

		default:
			return state;
		}
  	};
  
export default favoritesReducer;
  