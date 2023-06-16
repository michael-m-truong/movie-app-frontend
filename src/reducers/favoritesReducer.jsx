const initialState = {
    favorites: new Map()
  };
  
  const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      	case 'INITIALIZE_FAVORITES':
			console.log("DONE")
			return {
				...state,
				favorites: new Map(action.payload) // Initialize favorites with the provided Map
			};
      	case 'ADD_FAVORITE':
			console.log(action.payload)
        	return {
            	...state,
            	favorites: new Map(state.favorites).set(action.payload.movieId, action.payload) // Add the new favorite movie to the Map
        	};
      	case 'REMOVE_FAVORITE':
			console.log("here")
			const newFavorites = new Map(state.favorites);
			newFavorites.delete(action.payload.movieId); // Remove the favorite movie with the specified movieId from the Map
			return {
				...state,
				favorites: newFavorites
			};
		default:
			return state;
		}
  	};
  
export default favoritesReducer;
  