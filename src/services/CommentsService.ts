import api from './api';
import { Comment } from '../common/types'


export function CommentsService() {
    return {    
        async create(data: Comment) {
            try {
                return (await api.post(`comments`,{
                    message: data.message,
                    date: data.date,
                    question: data.question
                })).data as Comment[]
            }catch(e) {
                console.log(e)
            }
        },
    }
}

