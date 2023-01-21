import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../assets/Form.css'
import { useNavigate } from "react-router-dom"

export function Register() {

    const navigate = useNavigate();

    return (
        <>
        <h1>Register</h1>
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Enter username" />
            <Form.Text className="text-muted" onClick={()=>navigate("/login")}>
                Click here if you already have an account
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        </>
    );
}