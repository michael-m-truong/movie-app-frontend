import { instance, api } from "./axiosConfig"

export const read_allService = () => instance.get(
    "movies/read-all", 
    null,
    {
    //     headers: {
            withCredentials: true,
    //     }
    }
)
