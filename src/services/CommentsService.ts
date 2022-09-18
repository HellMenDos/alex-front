import api from './api';
import { Comment } from '../common/types'


export function CommentsService() {
    return {    
        async create(data: Comment) {
            try {
                return (await api.post(`comments`,{
                    message: data.message,
                    date: data.date,
                    questionId: data.questionId
                })).data as Comment[]
            }catch(e) {
                console.log(e)
            }
        },
        async getAll(question: number) {
            try {
                return (await api.get(`comments/${question}`)).data as Comment[]
            }catch(e) {
                console.log(e)
            }
        },
    }
}

