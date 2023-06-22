import axios from "axios";
import { isLoggedInService, loginService, registerService, logoutService} from "./authController";
import { add_favoriteService, add_ratingService, add_watchlistService, edit_ratingService, read_allService, remove_favoriteService, remove_watchlistService } from "./moviesController";

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
        remove_favorite: remove_favoriteService,

        add_rating: add_ratingService,
        edit_rating: edit_ratingService,

        add_watchlist: add_watchlistService,
        remove_watchlist: remove_watchlistService
    }
}
