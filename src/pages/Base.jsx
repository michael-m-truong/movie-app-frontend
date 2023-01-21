import { Link, Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { Landing } from "./Landing"

const useAuth = () => {
    const user = {loggedIn: false};
    return user && user.loggedIn;
}

export function Base() {
    const isAuth = useAuth();
    return isAuth ? <Home /> : <Landing /> ;
    //return <h1>hi</h1>
}