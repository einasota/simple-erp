import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

export const api = axios.create({
    baseURL:'http://192.168.1.15:3333'
})

api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage()
        config.headers.Authorization = `Bearer ${user?.token}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)