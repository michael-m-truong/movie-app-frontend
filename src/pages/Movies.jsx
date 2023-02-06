import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import { Landing } from "./Landing"
import { useNavigate } from "react-router-dom"

export function Movies({authUser}) {

    const navigate = useNavigate();
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
    if (isAuth == null) return <div />
    return !isAuth ? <Landing/> : (
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