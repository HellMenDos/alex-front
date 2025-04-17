import api from './api';
import { Favourite } from '../common/types';

export function FavouritesService() {
    return {    
        async create(data: Favourite) {
            try {
                return (await api.post(`favourites`,{
                    date: data.date,
                    questionId: data.questionId
                })).data as Favourite[]
            }catch(e) {
                console.log(e)
            }
        },
        async getAll(question: number) {
            try {
                return (await api.get(`favourites/${question}`)).data as Favourite[]
            }catch(e) {
                console.log(e)
            }
        },
        async delete(id: number) {
            try {
                return (await api.delete(`favourites/${id}`)).data
            }catch(e) {
                console.log(e)
            }
        },
    }
}

