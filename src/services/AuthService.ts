import axios from "axios"
const QUESTIONS_DOMAIN = 'http://localhost:3000'

export function AuthService() {
    return {    
        async signin({ email, password }:{ email: string, password: string } ) {
            return axios.post(`${QUESTIONS_DOMAIN}/users/signin`, { email, password })
        },
        async signup({ email, password, phone, name }:{ email: string, password: string, phone: string, name: string } ) {
            return axios.post(`${QUESTIONS_DOMAIN}/users/signup`, { email, password, phone, name })
        },
    }
}

