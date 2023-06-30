import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../assets/css/Form.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { api } from '../axios/axiosConfig';
import Cookies from "universal-cookie";
import axios from 'axios';
import { store } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import 'react-phone-number-input/style.css'
import PhoneInput, {isPossiblePhoneNumber} from 'react-phone-number-input'
import '../assets/css/Profile.css'


export function Profile() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [password, setPassword] = useState("random characters");
    const username = useSelector(state => state.user.username);
    const user_phoneNumber = useSelector(state => state.user.phoneNumber);
    const user = useSelector(state => state.user);

    console.log(user)

    const [phoneNumber, setPhoneNumber] = useState()

    useEffect(() => {
      setPhoneNumber(user_phoneNumber)
    }, [user_phoneNumber])
    

    const updatePhoneNumber = async () => {
      try {
        if (!isPossiblePhoneNumber(phoneNumber)) {
          return
        }
        api.auth.updateNumber({updatedPhoneNumber: phoneNumber})
        dispatch({type: 'UPDATE_PHONE', payload: phoneNumber})
      }
      catch (error) {

      }
    }

    return (
      <div className="container">
        <div className="form-container">
          <h1>Profile</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Username"
                value={username} // Set the value to display
                
                disabled={true}
              />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password} // Set the value to display
                disabled={true}
              />
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <PhoneInput
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              className='form-control'/>
            </Form.Group>

            <br/>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="primary"
                onClick={() => setPhoneNumber(user_phoneNumber)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={updatePhoneNumber}
              >
                Save Changes
              </Button>
            </div>
            
          </Form>
        </div>
      </div>
    );
}