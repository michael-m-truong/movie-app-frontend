import { Link, Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { Landing } from "./Landing"
import { api } from "../axios/axiosConfig"
import { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import { Suspense} from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';
import { Movies } from "./Movies";
import { Navbar } from "./Navbar";
import { Header } from "./Header";


const useAuth = async () => {
    let response;
    let user;
    try {
        response = await api.movies.read_all()
        user = {loggedIn: true};
    }
    catch (e) {
        user = {loggedIn: false};
    }
    console.log(user)
    return user && user.loggedIn;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export function Base({authUser, routerPage}) {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    //console.log(isLoggedIn)
    //console.log(page)

    return (
      <>
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <Navbar isLoggedIn={isLoggedIn}/>
        </Grid>
        <Grid item xs={9.5}>
          <Movies routerPage={routerPage}/>
        </Grid>
      </Grid>
      </>
        // isLoggedIn ? <Home /> : <Landing />
    )
    //return <h1>hi</h1>
}