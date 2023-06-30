import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../assets/css/reminderModal.css'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";


function ReminderModal({ closeModal }) {

    const phoneNumber = useSelector(state => state.user.phoneNumber)


    const phoneExists= () => {
        console.log(phoneNumber)
        if (phoneNumber === "" || phoneNumber === null || phoneNumber === undefined) {
            return false
        }
        return true
    }


    return (
      <>
        <Modal show={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Set phone reminder</Modal.Title>
          </Modal.Header>
          
          {phoneExists() ?  <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body> 
          
          :
          <Modal.Body>Whoops! Look like you don't have a phone number attached to the profile.<br/><br/>Go to the profile button and add your phone number under 'Edit Profile'</Modal.Body>
          }

        {phoneExists() ?
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={closeModal}>
              Save Changes
            </Button>
          </Modal.Footer>

        :
        <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Link to="/edit-profile">
            <Button variant="primary">
              Edit profile
            </Button>
            </Link>
          </Modal.Footer>
        }   
        </Modal>
      </>
    );
  }
  
  export default ReminderModal;