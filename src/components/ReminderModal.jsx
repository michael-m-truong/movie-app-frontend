import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../assets/css/reminderModal.css'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { api } from '../axios/axiosConfig';


function ReminderModal({ closeModal, selectedMovie }) {

    const phoneNumber = useSelector(state => state.user.phoneNumber)
    //TODO: useSelector reminders, if already in reminder do a modal that says are you sure


    const phoneExists= () => {
        console.log(phoneNumber)
        if (phoneNumber === "" || phoneNumber === null || phoneNumber === undefined) {
            return false
        }
        return true
    }

    const createReminder = async () => {
      await api.movies.add_reminder(JSON.stringify({
        phoneNumber: phoneNumber,
        title: selectedMovie.title,
        movieId: selectedMovie.id,
        genre: getGenreNames(selectedMovie.genre_ids),
        vote_average: selectedMovie?.vote_average,
        poster_path: selectedMovie.poster_path,
        overview: selectedMovie.overview,
        backdrop_path: selectedMovie.backdrop_path,
        release_date: selectedMovie.release_date
      }))
    }

    const removeReminder = async () => {
      await api.movies.add_reminder(JSON.stringify({
        phoneNumber: phoneNumber,
        movieId: selectedMovie.id,
      }))
    }

    //if not in reminders, return this
    return (
      <>
        <Modal show={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Set phone reminder</Modal.Title>
          </Modal.Header>
          
          {phoneExists() ?  <Modal.Body>You will be notified via text message when the movie comes out!</Modal.Body> 
          
          :
          <Modal.Body>Whoops! Look like you don't have a phone number attached to the profile.<br/><br/>Go to the profile button and add your phone number under 'Edit Profile'</Modal.Body>
          }

        {phoneExists() ?
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={async () => {await createReminder(); closeModal()}}>
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