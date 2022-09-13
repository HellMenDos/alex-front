import axios from "axios"
import { Tech } from '../common/types';
const QUESTIONS_DOMAIN = 'http://localhost:8080'

export function TechService() {
    return {    
        async get(langTitle: string) {
            return await axios.get<null, Tech[]>(`${QUESTIONS_DOMAIN}/technology/lang/${langTitle}/`)
        },
        async all() {
            return await axios.get<null, Tech[]>(`${QUESTIONS_DOMAIN}/technology/all/`)
        }
    }
}

