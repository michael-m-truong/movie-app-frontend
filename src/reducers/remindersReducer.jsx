const initialState = {
    reminders: new Map()
  };
  
  const remindersReducer = (state = initialState, action) => {
    switch (action.type) {
      	case 'INITIALIZE_REMINDERS':
            const remindersMap = action.payload.reduce((result, item) => {
                const { movieId, ...rest } = item;
                rest.movieId = movieId;
                result.set(String(movieId), rest);
                return result;
              }, new Map());              
            console.log(remindersMap)
			return {
				...state,
				reminders: remindersMap // Initialize reminders with the provided Map
			};
      	case 'ADD_REMINDERS':
			console.log(action.payload)
        	return {
            	...state,
            	reminders: new Map(state.reminders).set(action.payload.movieId, action.payload) // Add the new favorite movie to the Map
        	};
      	case 'REMOVE_REMINDERS':
			console.log("here")
			const newReminders = new Map(state.reminders);
			newReminders.delete(action.payload.movieId); // Remove the favorite movie with the specified movieId from the Map
			return {
				...state,
				reminders: newReminders
			};
		default:
			return state;
		}
  	};
  
export default remindersReducer;
  