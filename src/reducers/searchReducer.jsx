const initialState = {
    searchQuery: null
  };
  
  const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      	case 'SEARCH':
			return {
				...state,
				searchQuery: action.payload
			};
        case 'CLEAR_SEARCH':
            return {
                ...state,
                searchQuery: ""
            };
		default:
			return state;
		}
  	};
  
export default searchReducer;
  