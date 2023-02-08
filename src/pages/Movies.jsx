import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import { Landing } from "./Landing"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';


export function Movies({authUser}) {

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    // const navigate = useNavigate();
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
    if (isLoggedIn == null) return
    return !isLoggedIn ? <Landing/> : (
        <>
        <nav>
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/logout">Logout</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            </ul>
        </nav>
        <h1>Movies</h1>
        </>
    )
}