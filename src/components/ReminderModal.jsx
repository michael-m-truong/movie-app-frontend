import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../assets/css/reminderModal.css'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { api } from '../axios/axiosConfig';

const genreMappings = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};


function ReminderModal({ closeModal, selectedMovie }) {

    const phoneNumber = useSelector(state => state.user.phoneNumber)
    const reminders = useSelector(state => state.reminders.reminders)
    const dispatch = useDispatch();
    //TODO: useSelector reminders, if already in reminder do a modal that says are you sure


    const phoneExists= () => {
        console.log(phoneNumber)
        if (phoneNumber === "" || phoneNumber === null || phoneNumber === undefined) {
            return false
        }
        return true
    }

    const createReminder = async () => {
      api.movies.add_reminder(JSON.stringify({
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

      dispatch({ type: 'ADD_REMINDERS', payload: {
        title: selectedMovie.title,
        movieId: String(selectedMovie.id),
        genre: getGenreNames(selectedMovie.genre_ids),
        vote_average: selectedMovie.vote_average,
        poster_path: selectedMovie.poster_path,
        overview: selectedMovie.overview,
        backdrop_path: selectedMovie.backdrop_path,
        release_date: selectedMovie.release_date
      } });
    }

    const removeReminder = async () => {
      api.movies.remove_reminder(JSON.stringify({
        phoneNumber: phoneNumber,
        movieId: (selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId),
      }))

      dispatch({ type: 'REMOVE_REMINDER', payload: {movieId: String((selectedMovie?.id ? selectedMovie.id : selectedMovie.movieId))} });
      closeModal()
    
    }

    const getGenreNames = (genreIds) => {
      if (!genreIds){
        return false
      }
      return genreIds
        .map((genreId) => genreMappings[genreId])
        .filter((genre) => genre); // Filter out undefined genres
    };

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
            <Button variant="primary" onClick={async () => {console.log('here'); await createReminder(); closeModal()}}>
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