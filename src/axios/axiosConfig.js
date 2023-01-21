import axios from "axios";
import { loginService } from "./authController";
import { read_allService } from "./moviesController";

export const instance = axios.create({
    //baseURL: "https://movie-app-backend-d7yq.onrender.com",
    baseURL: "http://localhost:3000",
    //url: "auth/user",
    //method: "post",
    withCredentials: true,
    headers: {
        //Authorization: `Bearer ${token}`,
        'Accept': "application/json",
        'content-type': 'application/json',
      }
})

export const api = {
    auth: {
        login: loginService
    },
    movies: {
        read_all: read_allService
    }
}
