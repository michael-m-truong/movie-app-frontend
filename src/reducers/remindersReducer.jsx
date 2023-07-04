const initialState = {
    reminders: new Map(),
	originalReminders: new Map()
  };
  
  const remindersReducer = (state = initialState, action) => {
    switch (action.type) {
      	case 'INITIALIZE_REMINDERS':
			if (state.originalReminders.size !== 0) {  //need this bc it renders twice for some rzn
				return {
					...state
				}
			}
            const remindersMap = action.payload.reduce((result, item) => {
                const { movieId, ...rest } = item;
                rest.movieId = movieId;
                result.set(String(movieId), rest);
                return result;
              }, new Map());              
            console.log(remindersMap)
			return {
				...state,
				reminders: remindersMap, // Initialize reminders with the provided Map
				originalReminders: remindersMap
			};
		case 'UPDATE_OTHER_LISTS_WITH_RATINGS':
			console.log("hereeeeeee")
			const ratings = new Map(action.payload);
			const updatedReminders = new Map(state.reminders);
		
			ratings.forEach((rating, movieId) => {
				if (updatedReminders.has(movieId)) {
				const reminder = updatedReminders.get(movieId);
				reminder.ratingValue = rating.ratingValue;
				}
			});
		
			return {
				...state,
				reminders: updatedReminders,
			};
		case 'UPDATE_OTHER_LISTS_WITH_RATING':
			const { movieId, ratingValue } = action.payload;
		
			if (state.reminders.has(movieId)) {
				const updatedReminders = new Map(state.reminders);
				const reminder = updatedReminders.get(movieId);
				reminder.ratingValue = ratingValue;
		
				return {
				...state,
				reminders: updatedReminders,
				};
			}
		
			return state;
		case 'REMOVE_RATING_FROM_OTHER_LISTS':
			const movieIdToRemove = action.payload;
		
			if (state.reminders.has(movieIdToRemove)) {
				const updatedReminders = new Map(state.reminders);
				const reminder = updatedReminders.get(movieIdToRemove);
				delete reminder.ratingValue;
		
				return {
				...state,
				reminders: updatedReminders,
				};
			}
		
			return state;
      	case 'ADD_REMINDERS':
			console.log(action.payload)
        	return {
            	...state,
            	reminders: new Map(state.reminders).set(action.payload.movieId, action.payload), // Add the new reminder movie to the Map
				originalReminders: new Map(state.reminders).set(action.payload.movieId, action.payload)
        	};
      	case 'REMOVE_REMINDERS':
			console.log("here")
			const newReminders = new Map(state.reminders);
			newReminders.delete(action.payload.movieId); // Remove the reminder movie with the specified movieId from the Map
			return {
				...state,
				reminders: newReminders,
				originalReminders: newReminders
			};
		case 'FILTER':
			console.log(state.reminders)
			let filteredReminders = new Map(state.originalReminders);
			let [filters, minYourScore, minScore, selectedGenres, earliestDate, latestDate, locationPathname] = action.payload
			if (locationPathname != '/reminders') {
				return {
					...state
				}
			}
			filters.forEach((filter) => {
				switch (filter) {
				case 'FILTER_BY_DATE_ASCENDING':
					filteredReminders = new Map([...filteredReminders.entries()].sort((a, b) => {
						return new Date(a[1].dateAdded) - new Date(b[1].dateAdded);
					}));
					break;
				case 'FILTER_BY_DATE_DESCENDING':
					console.log(filteredReminders)
					filteredReminders = new Map([...filteredReminders.entries()].sort((a, b) => {
						console.log(new Date(b[1].dateAdded))
						console.log(new Date(a[1].dateAdded))
						return new Date(b[1].dateAdded) - new Date(a[1].dateAdded);
					}));
					break;
				case 'FILTER_BY_VOTE_AVERAGE_ASCENDING':
					filteredReminders = new Map([...filteredReminders.entries()].sort((a, b) => {
						return a[1].vote_average - b[1].vote_average;
					}));
					break;
				case 'FILTER_BY_VOTE_AVERAGE_DESCENDING':
					filteredReminders = new Map([...filteredReminders.entries()].sort((a, b) => {
						return b[1].vote_average - a[1].vote_average;
					}));
					break;
				case 'FILTER_BY_YOUR_RATING_ASCENDING':
					filteredReminders = new Map([...filteredReminders.entries()]
						.filter(([_, movie]) => movie.ratingValue)
						.sort((a, b) => {
							return a[1].ratingValue - b[1].ratingValue;
						})
					);
					break;
				case 'FILTER_BY_YOUR_RATING_DESCENDING':
					filteredReminders = new Map([...filteredReminders.entries()]
						.filter(([_, movie]) => movie.ratingValue)
						.sort((a, b) => {
							return b[1].ratingValue - a[1].ratingValue;
					})
					);
					break;
				case 'FILTER_BY_YOUR_RATING_MINIMUM':
					console.log(minYourScore)
					filteredReminders = new Map([...filteredReminders.entries()]
						.filter(([_, movie]) => (movie.ratingValue  && movie.ratingValue >= minYourScore))
					);
					break;
				case 'FILTER_BY_CRITIC_RATING_MINIMUM':
					console.log(minScore)
					filteredReminders = new Map([...filteredReminders.entries()]
						.filter(([_, movie]) => (movie.vote_average >= minScore))
					);
					break;
				case 'FILTER_BY_GENRE':
					console.log(selectedGenres);
					filteredReminders = new Map([...filteredReminders.entries()]
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
					filteredReminders = new Map([...filteredReminders.entries()].filter(([_, movie]) => {
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
					filteredReminders = new Map([...filteredReminders.entries()].filter(([_, movie]) => {
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
			console.log(filteredReminders)
			console.log(action.payload)
			return {
				...state,
				reminders: filteredReminders,
				activeFilters: action.payload,
			};
		case 'RESET_FILTERS':
			return {
				...state,
				reminders: new Map(state.originalReminders),
				activeFilters: [],
			};
		case 'CLEAR_REDUCER':
			return {
				...state,
				reminders: new Map(),
				originalReminders: new Map()
			}
		default:
			return state;
		}
  	};
  
export default remindersReducer;
  