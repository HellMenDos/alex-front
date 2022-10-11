import { Lang } from '../common/types';
import axios from 'axios';
import { QUESTIONS_DOMAIN } from './api';

export function LangService() {
    return {    
        async all() {
            return (await axios.get(`${QUESTIONS_DOMAIN}/lang/all/`)).data as Lang[]
        }
    }
}

