import axios from "axios"
import { Question } from '../common/types';
const QUESTIONS_DOMAIN = 'http://localhost:8080'

export function QuestionService() {
    return {    
        async get(lang: string, level: string, tech: string) {
            try {
                return await axios.get<null, Question[]>(encodeURI(`${QUESTIONS_DOMAIN}/question/fields/${lang}/${level}/${tech}/`))
            }catch(e) {
                console.log(e)
            }
        },
        async getOne(id: number) {
            try {
                return await axios.get<null, Question>(encodeURI(`${QUESTIONS_DOMAIN}/question/one/${id}/`))
            }catch(e) {
                console.log(e)
            }
        }
    }
}

