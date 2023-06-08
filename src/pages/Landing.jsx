import { Link, Route, Routes, useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import '../assets/Form.css'
import axios from "axios";
import Cookies from "universal-cookie";


export function Landing() {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const test = () => {
        // let response_free = await axios.get('http://localhost:3000/', {
                
        //         headers: {
        //             withCredentials: true
        //         }
        // });
        axios.get('http://localhost:3000',{ withCredentials: true }).then((res) =>{
    console.log(res)
  })
        //console.log(response_free)
        return "hi"
    }

    const test2 = async () => {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 24);
        cookies.set("Name", "pls idek", {sameSite: 'strict', path: '/', expires: expirationDate})
    }
    const test3 = async () => {
        const res = await axios.get('/api/v1')
        console.log(res)
    }
    
    return (
    <>
    <h1>Movie App</h1>
    <Button variant="primary" size="lg" id="register" className="form" onClick={()=>navigate("/register")}>
        Register
    </Button>
    <Button variant="primary" size="lg" id="login" className="form" onClick={()=>navigate("/login")}>
        Login
    </Button>
    </>
    )
}