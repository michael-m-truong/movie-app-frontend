import { Link, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import { Landing } from "./Landing"


export function Logout({authUser}) {
    
    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {
        (async function () {
        try {
            console.log('T')
            await authUser()
            setIsAuth(true)
        } catch (e) {
            console.log('false')
            setIsAuth(false)
            console.log(e)
            navigate('/')
        }
        })()
    }, [])
    console.log(isAuth)
    if (isAuth == null) return <Loading/>
    return !isAuth ? <Landing/> : (
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
    )
}