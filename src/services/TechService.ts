import axios from "axios"
import { Tech } from '../common/types';
const QUESTIONS_DOMAIN = 'http://localhost:8080'

export function TechService() {
    return {    
        async get(langTitle: string) {
            return (await axios.get(`${QUESTIONS_DOMAIN}/technology/lang/${langTitle}/`)).data as Tech[]
        },
        async all() {
            return (await axios.get(`${QUESTIONS_DOMAIN}/technology/all/`)).data as Tech[]
        }
    }
}

