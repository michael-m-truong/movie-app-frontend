import { Link, Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { Landing } from "./Landing"
import { api } from "../axios/axiosConfig"
import { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import { Suspense} from "react";

import { useSelector } from 'react-redux';


// const useAuth = async () => {
//     let response;
//     let user;
//     try {
//         response = await api.movies.read_all()
//         user = {loggedIn: true};
//     }
//     catch (e) {
//         user = {loggedIn: false};
//     }
//     console.log(user)
//     return user && user.loggedIn;
// }

export function Base({authUser}) {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    console.log(isLoggedIn)
    //const [isAuth, setIsAuth] = useState(null);
    // useEffect(() => {
    //     useAuth().then(isLoggedIn => {
    //         setIsAuth(isLoggedIn);
    //         console.log("HEREEEE")
    //         console.log(isLoggedIn)
    //     });
    // }, []);
    // console.log("renders")

    // useEffect(() => {
    //     (async function () {
    //     try {
    //         await authUser()
    //         setIsAuth(true)
    //     } catch (e) {
    //         console.log(e)
    //         setIsAuth(false)
    //     }
    //     })()
    // }, [])
    if (isLoggedIn == null) return 
    return (
        isLoggedIn ? <Home /> : <Landing />
    )
    //return <h1>hi</h1>
}