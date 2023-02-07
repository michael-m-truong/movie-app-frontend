import './assets/App.css'
import { Link, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Movies } from "./pages/Movies"
import { Register } from "./pages/Register"
import { Logout } from "./pages/Logout"
import { Landing } from "./pages/Landing"
import { Base } from "./pages/Base"
import ProtectedRoutes from './ProtectedRoutes'
import UnprotectedRoutes from './UnprotectedRoutes'
import { api } from './axios/axiosConfig'

async function authUser() {
  try {
    let auth_response = await api.auth.isLoggedIn()
    console.log('auth test')
  }
  catch (error) {
    console.log('throws')
    throw {
      error
    }
  }
}

function App() {
  return (
  <>
  <Routes>
  <Route path="/" element={<Base authUser={authUser}/>}/>
    
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
   
      <Route path="/movies" element={<Movies authUser={authUser} />} />
      <Route path="/logout" element={<Logout authUser={authUser} />} />
  </Routes>
  </>
  )
}

export default App
