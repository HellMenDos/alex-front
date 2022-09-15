import api from './api';
import { User } from '../common/types';

export function UserService() {
    return {    
        async me() {
            try {
                return (await api.get(`/users/me/`)).data as User
            }catch(e) {
                console.log(e)
            }
        },
        async update({ email, password, phone, name }:{ email: string, password: string, phone: string, name: string } ) {
            try {
                const response = await api.put(`/users/me`, { email, password, phone, name })
                return response
            } catch(e: any) {
                return {data: null, error: e.response.data.error}
            }  
        },
    }
}

