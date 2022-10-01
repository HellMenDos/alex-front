import axios from "axios"
import { Tech } from '../common/types';
import { QUESTIONS_DOMAIN } from "./api";

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

