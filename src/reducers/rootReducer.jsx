import { combineReducers } from 'redux';
import userReducer from './loggedInReducer';
import favoritesReducer from './favoritesReducer';
import searchReducer from './searchReducer';
import ratingsReducer from './ratingsReducer';
//import currentPageReduccer from './currentPageReducer'


const rootReducer = combineReducers({
  user: userReducer,
  favorites: favoritesReducer,
  search: searchReducer,
  ratings: ratingsReducer
  //currentPage: currentPageReduccer
});

export default rootReducer;