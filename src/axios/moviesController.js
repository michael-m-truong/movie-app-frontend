import { instance, api } from "./axiosConfig"

export const read_allService = () => instance.get(
    "movies/read-all", 
    null,
)

export const add_favoriteService = (data) => instance.post(
    "movies/add-favorite", 
    data,
)

export const remove_favoriteService = (data) => instance.post(
    "movies/remove-favorite", 
    data,
)

export const add_ratingService = (data) => instance.post(
    "movies/add-rating", 
    data,
)

export const edit_ratingService = (data) => instance.post(
    "movies/edit-rating", 
    data,
)

export const remove_ratingService = (data) => instance.post(
    "movies/remove-rating", 
    data,
)

export const add_watchlistService = (data) => instance.post(
    "movies/add-watchlist", 
    data,
)

export const remove_watchlistService = (data) => instance.post(
    "movies/remove-watchlist", 
    data,
)

export const getStats_Service = () => instance.get(
    "movies/discover-stats",
    null
)
