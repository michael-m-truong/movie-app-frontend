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
