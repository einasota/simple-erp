import { api } from "../../lib/api"
import { User } from "./types"

export function setUserLocalStorage (user: User | null) {
    localStorage.setItem('l', JSON.stringify(user))
}

export function getUserLocalStorage () {
    const json = localStorage.getItem('l')
    if (!json) {
        return null
    }
    console.log(json)
    const user = JSON.parse(json)
    return user ?? null
}

export async function LoginRequest (login:string, pass:string) {
    try {
        const request = await api.post('login', {login, pass})
        return request.data
    } catch (error) {
        return null
    }
}