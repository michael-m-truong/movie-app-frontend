import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../assets/Form.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { api } from '../axios/axiosConfig';
import Cookies from "universal-cookie";
import axios from 'axios';

export function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginCheck, setLoginCheck] = useState();

    const handleLogin = async (e) => {
        // prevent form from refreshing whole page
        e.preventDefault();
        alert("username: " + username + " password: " + password)
        let data = {username: username, password: password}
        data = JSON.stringify(data)
        console.log(data)
        try {
            //const response = await api.auth.login(data)
            // const token = response.data.token
            // console.log(response)
            // const cookies = new Cookies();
            // const expirationDate = new Date();
            // expirationDate.setHours(expirationDate.getHours() + 24);
            // cookies.set("TOKEN", token, {
            //     path: "/",
            //     //expires: expirationDate,
            //     sameSite: "None",
            //     secure: false,
            //     httpOnly: true
            // })
            // cookies.set("weird", token, {
            //     path: "/",
            //     //expires: expirationDate,
            //     sameSite: false,
            //     secure: false,
            //     httpOnly: true
            // })
            // cookies.set("urmom", token, {
            //     path: "/",
            //     //expires: expirationDate,
            //     //httpOnly: true
            // })
            console.log("hi")
            // const response2 = await api.auth.login(data)
            // console.log(response2)
            //let auth_response = await api.movies.read_all()
            let response_free = await axios.get('https://movie-app-backend-d7yq.onrender.com/'/*'http://localhost:3000/'*/, {
                
                headers: {
                    withCredentials: true
                }
            });
            let response_proxy = await axios.post('/auth/login'/*'http://localhost:3000/'*/, {data}, {
                headers: {
                    withCredentials: true
                }
            });
            console.log(response_proxy)
            // let login_res = await axios.post('http://localhost:3000/auth/login', 
            //     {
            //         username: "test",
            //         password: "cottonball123"
            //     },
            //     {
            //     headers: {
            //         withCredentials: true
            //     }
            // });
            let auth_response = await api.movies.read_all()  // use this
            console.log(response_free)
            console.log(auth_response)
            setLoginCheck("Login successful")
            
        }
        catch (e) {
            console.log(e)
            setLoginCheck("Login failed")
        }
        //console.log(response)
    }

    return (
        <>
        <h1>Login</h1>
        <Form>
            <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Enter username" onChange={(e)=> setUsername(e.target.value)} />
            <Form.Text className="text-muted" onClick={() => navigate("/register")}>
                Click here if you don't have an account
            </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e)=> handleLogin(e)}>
            Submit
            </Button>
        </Form>
        <h2>{loginCheck}</h2>
        </>
    );
}