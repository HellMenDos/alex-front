import axios from "axios"
import { Question } from '../common/types';
import api from './api';

const QUESTIONS_DOMAIN = 'http://localhost:8080'

export function QuestionService() {
    return {    
        async get(lang: string, level: string, tech: string) {
            try {
                return (await axios.get(encodeURI(`${QUESTIONS_DOMAIN}/question/fields/${lang}/${level}/${tech}/`))).data as Question[]
            }catch(e) {
                console.log(e)
            }
        },
        async getOne(id: number) {
            try {
                return (await axios.get(encodeURI(`${QUESTIONS_DOMAIN}/question/one/${id}/`))).data as Question
            }catch(e) {
                console.log(e)
            }
        },
        async create(data: any) {
            try {
                return api({
                    method: "post",
                    url: "questions",
                    data: data,
                    headers: { "Content-Type": "multipart/form-data" },
                })
            }catch(e) {
                console.log(e)
            }
        }
    }
}

