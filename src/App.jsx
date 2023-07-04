import './assets/css/App.css'
import { Link, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Movies } from "./pages/Movies"
import { Register } from "./pages/Register"
import { Logout } from "./pages/Logout"
import { Landing } from "./pages/Landing"
import { Base } from "./pages/Base"
import { Moderator } from './pages/Moderator'
import ProtectedRoutes from './ProtectedRoutes'
import UnprotectedRoutes from './UnprotectedRoutes'
import { api } from './axios/axiosConfig'
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducer'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { Header } from './pages/Header'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Stats } from './pages/Stats'
import { Profile } from './pages/Profile'

async function authUser(dispatch) {
  try {
    let auth_response = await api.auth.isLoggedIn()
    console.log('auth test')
    console.log(auth_response)
    dispatch({ type: "LOGGED_IN", payload: auth_response.data})
  }
  catch (error) {
    console.log(error)
    dispatch({ type: "LOGGED_OUT"})
    throw error

  }
}

async function getUserMovieData(dispatch) {
  try {
    let getUserMovieData_response = await api.movies.read_all()
    console.log("here")
    dispatch({ type: "INITIALIZE_RATINGS", payload: Object.entries(getUserMovieData_response.data.user.ratings)})
    dispatch({ type: "INITIALIZE_FAVORITES", payload: Object.entries(getUserMovieData_response.data.user.favorites)})
    dispatch({ type: "INITIALIZE_WATCHLIST", payload: Object.entries(getUserMovieData_response.data.user.watchlist)})
    dispatch({ type: "INITIALIZE_REMINDERS", payload: getUserMovieData_response.data.user.reminders})

    const ratingsMap = new Map(Object.entries(getUserMovieData_response.data.user.ratings));
    dispatch({ type: 'UPDATE_OTHER_LISTS_WITH_RATINGS', payload: ratingsMap });

  }
  catch (error) {
    console.log(error)
    dispatch({ type: "SYNC_FAIL"})
    throw error

  }
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

function App() {

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    // Dispatch an action to fetch data from an API and populate the store
    const checkLoggedIn = async () => {
      try {
        await store.dispatch(authUser);
        await store.dispatch(getUserMovieData)
      }
      catch (e) {
        store.dispatch({ type: "LOGGED_OUT"})
      }
    }
    checkLoggedIn()
  }, []);

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Provider store={store}>
    <Header authUser={authUser}></Header>
    <Routes>
    <Route path="/" element={<Base authUser={authUser}/>}/>
    {/* <Route element={<UnprotectedRoutes/>} > */}
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
    {/* </Route> */}
    {/* <Route element={<ProtectedRoutes/>} > */}
        <Route path="/search" element={<Movies routerPage="search"/>} />
        <Route path="/favorites" element={<Base routerPage="favorites"/>}/>
        <Route path="/reminders" element={<Base routerPage="reminders"/>}/>
        <Route path="/watchlist" element={<Base routerPage="watchlist"/>}/>
        <Route path="/ratings" element={<Base routerPage="ratings"/>}/>
        <Route path="/now-playing" element={<Movies routerPage="now-playing"/>}/>
        <Route path="/upcoming" element={<Movies routerPage="upcoming"/>}/>
        <Route path="/top-movies" element={<Movies routerPage="top-movies"/>}/>
        <Route path="/discover" element={<Stats routerPage="discover"/>}/>
        <Route path="/edit-profile" element={<Profile routerPage="profile"/>}/>
        <Route path="/logout" element={<Logout />} />
    {/* </Route> */}
    <Route path="/moderator" element={<Moderator authUser={authUser} />} />
    </Routes>
    </Provider>
    </LocalizationProvider>
    </>
  )
}

export default App
export { store };