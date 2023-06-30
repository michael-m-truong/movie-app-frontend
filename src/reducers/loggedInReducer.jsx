const initialState = {
    isLoggedIn: null,
    username: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGGED_IN':
        return {
          ...state,
          isLoggedIn: true,
          username: action.payload
        };
      case 'LOGGED_OUT':
        return {
          ...state,
          isLoggedIn: false
        };
      default:
        return state;
    }
  };
  
export default userReducer;
  