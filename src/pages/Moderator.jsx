import { Link, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import { Landing } from "./Landing"


export function Moderator({authUser}) {
    
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
        <h1>You are a moderator</h1>
        </>
    )
}