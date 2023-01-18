import './assets/App.css'
import { Link, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Movies } from "./pages/Movies"
import { Register } from "./pages/Register"
import { Logout } from "./pages/Logout"
import ProtectedRoutes from './ProtectedRoutes'
import UnprotectedRoutes from './UnprotectedRoutes'

function App() {
  return (
  <>
  <Routes>
    <Route element={<UnprotectedRoutes/>} >
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
    </Route>
    <Route element={<ProtectedRoutes/>} >
      <Route path="/" element={<Home />}/>
      <Route path="/movies" element={<Movies />}/>
      <Route path="/logout" element={<Logout />}/>
    </Route>
  </Routes>
  </>
  )
}

export default App
