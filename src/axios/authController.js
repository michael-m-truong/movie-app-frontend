import { instance, api } from "./axiosConfig"

export const loginService = (data) => instance.post(
    "auth/login",
    data  // passed into body
    // {
    //     withCredentials: true
    // }
)