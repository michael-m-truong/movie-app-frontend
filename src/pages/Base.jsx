import { Link, Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { Landing } from "./Landing"
import { api } from "../axios/axiosConfig"
import { useState, useEffect, useRef } from "react";
import Loading from "./Loading";

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

export function Base() {
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
    return isAuth ? <Home /> : <Landing /> ;
    //return <h1>hi</h1>
}