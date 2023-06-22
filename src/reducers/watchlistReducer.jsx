const initialState = {
    watchlist: new Map()
  };
  
  const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
      	case 'INITIALIZE_WATCHLIST':
			console.log(action.payload)
			return {
				...state,
				watchlist: new Map(action.payload) // Initialize watchlists with the provided Map
			};
      	case 'ADD_WATCHLIST':
			console.log(action.payload)
        	return {
            	...state,
            	watchlist: new Map(state.watchlist).set(action.payload.movieId, action.payload) // Add the new watchlist movie to the Map
        	};
      	case 'REMOVE_WATCHLIST':
			console.log("here")
			const newWatchlist = new Map(state.watchlist);
			newWatchlist.delete(action.payload.movieId); // Remove the watchlist movie with the specified movieId from the Map
			return {
				...state,
				watchlist: newWatchlist
			};
		default:
			return state;
		}
  	};
  
export default watchlistReducer;
  