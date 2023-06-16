import axios from "axios";
import { isLoggedInService, loginService, registerService, logoutService} from "./authController";
import { add_favoriteService, read_allService, remove_favoriteService } from "./moviesController";

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
        register: registerService,
        login: loginService,
        logout: logoutService,
        isLoggedIn: isLoggedInService
    },
    movies: {
        read_all: read_allService,
        add_favorite: add_favoriteService,
        remove_favorite: remove_favoriteService
    }
}
