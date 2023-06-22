import { combineReducers } from 'redux';
import userReducer from './loggedInReducer';
import favoritesReducer from './favoritesReducer';
import searchReducer from './searchReducer';
import ratingsReducer from './ratingsReducer';
import watchlistReducer from './watchlistReducer';
//import currentPageReduccer from './currentPageReducer'


const rootReducer = combineReducers({
  user: userReducer,
  favorites: favoritesReducer,
  searchResults: searchReducer,
  ratings: ratingsReducer,
  watchlist: watchlistReducer
  //currentPage: currentPageReduccer
});

export default rootReducer;