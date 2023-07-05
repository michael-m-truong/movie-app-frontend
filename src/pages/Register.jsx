import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../assets/css/Form.css'
import { useNavigate } from "react-router-dom"
import { api } from '../axios/axiosConfig';
import { useState } from "react";

export function Register() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerCheck, setRegisterCheck] = useState();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    
    useEffect(()=> {
      if (isLoggedIn) {
        navigate('/')
      }
    })

    const handleRegister = async (e) => {
        // prevent form from refreshing whole page
        e.preventDefault();
        //alert("username: " + username + " password: " + password)
        let data = {username: username, password: password}
        data = JSON.stringify(data)
        console.log(data)
        try {
            const response = await api.auth.register(data)
            setRegisterCheck("Register successful")
            
        }
        catch (e) {
            console.log(e)
            setRegisterCheck(e.response.data.message)
        }
        //console.log(response)
    }

    return (
        <>
        <div className="container">
      <div className="form-container">
        <h1>Register</h1>
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Enter username" onChange={(e)=> setUsername(e.target.value)}/>
            <Form.Text className="text-muted" onClick={()=>navigate("/login")}>
                Click here if you already have an account
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e)=> handleRegister(e)}>
            Submit
        </Button>
        </Form>
        <h2>{registerCheck}</h2>
        </div>
        </div>
        </>
    );
}