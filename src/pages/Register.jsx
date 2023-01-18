import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../assets/Form.css'

export function Register() {
    return (
        <>
        <h1>Register</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="email" placeholder="Enter username" />
            <Form.Text className="text-muted">
                Note: Username can not be changed after creation
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