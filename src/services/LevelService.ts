import axios from "axios"
import { Level } from '../common/types';
const QUESTIONS_DOMAIN = 'http://localhost:8080'

export function LevelService() {
    return {    
        async all() {
            return (await axios.get(`${QUESTIONS_DOMAIN}/level/all`)).data as Level[]
        }
    }
}

