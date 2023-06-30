import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../assets/css/Form.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { api } from '../axios/axiosConfig';
import Cookies from "universal-cookie";
import axios from 'axios';
import { store } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import '../assets/css/Profile.css'

export function Profile() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [password, setPassword] = useState("random characters");
    const username = useSelector(state => state.user.username);
    const [phoneNumber, setPhoneNumber] = useState()
    console.log(username)

    const getUserMovieData = async () => {
      try {
        let getUserMovieData_response = await api.movies.read_all()
        console.log(getUserMovieData_response.data.user)
        dispatch({ type: "INITIALIZE_FAVORITES", payload: Object.entries(getUserMovieData_response.data.user.favorites)})
        dispatch({ type: "INITIALIZE_RATINGS", payload: Object.entries(getUserMovieData_response.data.user.ratings)})
        dispatch({ type: "INITIALIZE_WATCHLIST", payload: Object.entries(getUserMovieData_response.data.user.watchlist)})
      }
      catch (error) {
        console.log(error)
        dispatch({ type: "SYNC_FAIL"})
        throw error
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
                type="submit"
                onClick={(e) => handleLogin(e)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleLogin(e)}
              >
                Save Changes
              </Button>
            </div>
            
          </Form>
        </div>
      </div>
    );
}