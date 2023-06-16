import { combineReducers } from 'redux';
import userReducer from './loggedInReducer';
import favoritesReducer from './favoritesReducer';
//import currentPageReduccer from './currentPageReducer'


const rootReducer = combineReducers({
  user: userReducer,
  favorites: favoritesReducer 
  //currentPage: currentPageReduccer
});

export default rootReducer;