const initialState = {
    isLoggedIn: null,
    username: "",
    phoneNumber: ""
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGGED_IN':
        return {
          ...state,
          isLoggedIn: true,
          username: action.payload.username,
          phoneNumber: action.payload?.phoneNumber
        };
      case 'LOGGED_OUT':
        return {
          ...state,
          isLoggedIn: false
        };
      case 'UPDATE_PHONE':
        return {
          ...state,
          phoneNumber: action.payload
        };
      default:
        return state;
    }
  };
  
export default userReducer;
  