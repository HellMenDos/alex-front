import api from './api';
import { User } from '../common/types';

type UpdateUserData = { email: string, password: string, phone: string, name: string }
type SupportData = { title: string, describe: string, email: string, phone: string, telegram: string }

export function UserService() {
    return {    
        async me() {
            try {
                return (await api.get(`/users/me/`)).data as User
            }catch(e) {
                console.log(e)
            }
        },
        async update({ email, password, phone, name }: UpdateUserData) {
            try {
                const response = await api.put(`/users/me`, { email, password, phone, name })
                return response
            } catch(e: any) {
                return {data: null, error: e.response.data.error}
            }  
        },
        async support({ title, describe, email, phone, telegram }: SupportData) {
            try {
                const response = await api.post(`/supports`, { title, describe, email, phone, telegram })
                return response
            } catch(e: any) {
                return {data: null, error: e.response.data.error}
            } 
        }
    }
}

