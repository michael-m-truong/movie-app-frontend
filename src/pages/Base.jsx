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

import { createTheme, ThemeProvider } from '@mui/material/styles';


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

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920, // Define your own 'xl' breakpoint value here
      },
    },
  });

export function Base({authUser, routerPage}) {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    //console.log(isLoggedIn)
    //console.log(page)

    return (
      <>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xl={2.5} lg={3} md={4} sm={4}>
            <Navbar isLoggedIn={isLoggedIn}/>
          </Grid>
          <Grid item xl={9.5} lg={9} md={8} sm={8}>
            <Movies routerPage={routerPage}/>
          </Grid>
        </Grid>
      </ThemeProvider>
      </>
        // isLoggedIn ? <Home /> : <Landing />
    )
    //return <h1>hi</h1>
}