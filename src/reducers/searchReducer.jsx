const initialState = {
    searchResults: null
  };
  
  const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INITIALIZE_SEARCH_RESULTS':
        console.log('searchingggggggggg')
			  return {
				  ...state,
				  searchResults: action.payload,
			  };
      case 'CLEAR_SEARCH':
        return {
            ...state,
            searchResults: null
        };        
		  default:
			  return state;
		  }
  	};
  
export default searchReducer;
  