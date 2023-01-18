import { Link, Route, Routes } from "react-router-dom"

export function Home() {
    return (
    <>
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/logout">Logout</Link></li>
            <li><Link to="/movies">Movies</Link></li>
        </ul>
    </nav>
    <h1>Home</h1>
    </>
    )
}