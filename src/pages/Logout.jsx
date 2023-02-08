import { Link, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import { Landing } from "./Landing"
import { store } from '../App';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../axios/axiosConfig";

export function Logout({authUser}) {
    const navigate = useNavigate()
    //const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    //console.log(isLoggedIn)

    useEffect(() => {
        const logout = async () => {
            await store.dispatch({ type: "LOGGED_OUT"})
            await api.auth.logout()
            navigate('/')
        }
        logout()
    }, [])
    // const [isAuth, setIsAuth] = useState(null)

    // useEffect(() => {
    //     (async function () {
    //     try {
    //         console.log('T')
    //         await authUser()
    //         setIsAuth(true)
    //     } catch (e) {
    //         console.log('false')
    //         setIsAuth(false)
    //         console.log(e)
    //         navigate('/')
    //     }
    //     })()
    // }, [])
    // console.log(isAuth)
    
    return null
    /*if (isLoggedIn == null) return <Loading/>
    return !isLoggedIn ? <Landing/> : (
        <>
        <nav>
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/logout">Logout</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            </ul>
        </nav>
        <h1>Logout</h1>
        </>
    )*/
}