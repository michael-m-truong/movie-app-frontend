import { instance, api } from "./axiosConfig"

export const registerService = (data) => instance.post(
    "auth/register",
    data  // passed into body
    // {
    //     withCredentials: true
    // }
)

export const loginService = (data) => instance.post(
    "auth/login",
    data  // passed into body
    // {
    //     withCredentials: true
    // }
)

export const logoutService = (data) => instance.post(
    "auth/logout",
    data  // passed into body
    // {
    //     withCredentials: true
    // }
)

export const isLoggedInService = (data) => instance.post(
    "auth/isLoggedIn",
    data  // passed into body
    // {
    //     withCredentials: true
    // }
)