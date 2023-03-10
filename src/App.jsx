import './assets/App.css'
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

async function authUser(dispatch) {
  try {
    let auth_response = await api.auth.isLoggedIn()
    console.log('auth test')
    dispatch({ type: "LOGGED_IN"})
  }
  catch (error) {
    console.log(error)
    dispatch({ type: "LOGGED_OUT"})
    throw error

  }
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

function App() {

  useEffect(() => {

    // Dispatch an action to fetch data from an API and populate the store
    const checkLoggedIn = async () => {
      try {
        await store.dispatch(authUser);
      }
      catch (e) {
        store.dispatch({ type: "LOGGED_OUT"})
      }
    }
    checkLoggedIn()
  }, []);

  return (
    <>
    <Provider store={store}>
    <Routes>
    <Route path="/" element={<Base authUser={authUser}/>}/>
    {/* <Route element={<UnprotectedRoutes/>} > */}
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
    {/* </Route> */}
    {/* <Route element={<ProtectedRoutes/>} > */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/logout" element={<Logout />} />
    {/* </Route> */}
    <Route path="/moderator" element={<Moderator authUser={authUser} />} />
    </Routes>
    </Provider>
    </>
  )
}

export default App
export { store };