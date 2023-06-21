const initialState = {
    favorites: new Map()
  };
  
  const ratingsReducer = (state = initialState, action) => {
    switch (action.type) {
      	case 'INITIALIZE_RATINGS':
			console.log(action.payload)
			return {
				...state,
				ratings: new Map(action.payload) // Initialize favorites with the provided Map
			};
      	case 'ADD_RATING':
			console.log(action.payload)
        	return {
            	...state,
            	ratings: new Map(state.ratings).set(action.payload.movieId, action.payload) // Add the new favorite movie to the Map
        	};
      	case 'REMOVE_RATING':
			console.log("here")
			const newRatings = new Map(state.ratings);
			newRatings.delete(action.payload.movieId); // Remove the favorite movie with the specified movieId from the Map
			return {
				...state,
				ratings: newRatings
			};
		default:
			return state;
		}
  	};
  
export default ratingsReducer;
  