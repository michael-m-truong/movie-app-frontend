import { combineReducers } from 'redux';
import userReducer from './loggedInReducer';
//import currentPageReduccer from './currentPageReducer'


const rootReducer = combineReducers({
  user: userReducer,
  //currentPage: currentPageReduccer
});

export default rootReducer;