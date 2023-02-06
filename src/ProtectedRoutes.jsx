import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Login } from "./pages/Login";
import { api } from "./axios/axiosConfig";
import { useState, useEffect, useRef } from "react";

const useAuth = async () => {
    let response;
    let user;
    try {
        response = await api.movies.read_all()
        user = {loggedIn: true};
    }
    catch (e) {
        user = {loggedIn: false};
    }
    console.log(user)
    return user && user.loggedIn;
}

const ProtectedRoutes = () => {
    const [isAuth, setIsAuth] = useState(null);
    useEffect(() => {
        useAuth().then(isLoggedIn => {
            setIsAuth(isLoggedIn);
            console.log("HEREEEE")
            console.log(isLoggedIn)
        });
    }, []);
    console.log("renders")
    if (isAuth === null) return;
    return isAuth ? <Outlet/> : <Navigate to="/login" />;
}

export default ProtectedRoutes;