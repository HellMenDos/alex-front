import { Lang } from '../common/types';
import axios from 'axios';
const QUESTIONS_DOMAIN = 'http://localhost:8080'

export function LangService() {
    return {    
        async all() {
            return (await axios.get(`${QUESTIONS_DOMAIN}/lang/all`)).data as Lang[]
        }
    }
}

