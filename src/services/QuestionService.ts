import axios from "axios"
import { Question } from '../common/types';
import api, { QUESTIONS_DOMAIN } from './api';


export enum Mode {
    fields = 'fields',
    random = 'random'
}

export function QuestionService() {
    return {    
        async get(lang: string, level: string, tech: string, mode: Mode = Mode.fields) {
            try {

                let url = `${QUESTIONS_DOMAIN}/question/`

                if(mode == Mode.fields) {
                    url += `reverse/${mode}/`
                }else {
                    url += `${mode}/`
                }

                if(lang) {
                    url += `${lang}/`
                }
                if(tech) {
                    url += `${tech}/`
                }
                if(level) {
                    url += `${level}`
                }

                return (await axios.get(encodeURI(url))).data as Question[] | Question
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
            }catch(e: any) {
                return {data: null, error: e?.response?.data?.error ? e?.response?.data?.error : 'Ошибка при создании'}
            }
        },
        async getMyQuestions() {
            try {
                return (await api.get('/questions')).data
            }catch(e) {
                console.log(e)
            }
        },
        async deleteMyQuestion(id: number) {
            try {
                return (await api.delete(`/questions/${id}`)).data
            }catch(e) {
                console.log(e)
            }
        }
    }
}

