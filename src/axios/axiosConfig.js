import axios from "axios";
import { loginService, registerService } from "./authController";
import { read_allService } from "./moviesController";

export const instance = axios.create({
    //baseURL: "https://movie-app-backend-d7yq.onrender.com",
    //baseURL: "http://localhost:3000",
    //url: "auth/user",
    //withCredentials: true,
    headers: {
        //Authorization: `Bearer ${token}`,
        'Accept': "application/json",
        'content-type': 'application/json',
      }
})

export const api = {
    auth: {
        login: loginService,
        register: registerService
    },
    movies: {
        read_all: read_allService
    }
}
