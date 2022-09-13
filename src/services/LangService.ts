import axios from "axios"
import { Lang } from '../common/types';
const QUESTIONS_DOMAIN = 'http://localhost:8080'

export function LangService() {
    return {    
        async all() {
            return await axios.get<null,Lang[]>(`${QUESTIONS_DOMAIN}/lang/all`)
        }
    }
}

