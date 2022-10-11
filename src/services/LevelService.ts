import axios from "axios"
import { Level } from '../common/types';
import { QUESTIONS_DOMAIN } from "./api";


export function LevelService() {
    return {    
        async all() {
            return (await axios.get(`${QUESTIONS_DOMAIN}/level/all/`)).data as Level[]
        }
    }
}

