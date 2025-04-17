import axios from "axios"
import { MAIN_DOMAIN } from "./api";
import { StorageService } from './StorageService';


export function AuthService() {
    return {    
        async signin({ email, password }:{ email: string, password: string } ) {
            try {
                const response = await axios.post(`${MAIN_DOMAIN}/users/signin`, { email, password })
                StorageService().set('tokens',response.data)
                return response
            } catch(e: any) {
                return {data: null, error: e.response.data.error}
            }  
        },
        async signup({ email, password, phone, name }:{ email: string, password: string, phone: string, name: string } ) {
            try {
                const response = await axios.post(`${MAIN_DOMAIN}/users/signup`, { email, password, phone, name })
                return response
            } catch(e: any) {
                return {data: null, error: e.response.data.error}
            }  
        },
        async forget({ email }: { email: string }) {
            try {
                const response = await axios.post(`${MAIN_DOMAIN}/users/forget`, { email })
                return response
            } catch(e: any) {
                return {data: null, error: e.response.data.error}
            }  

        },
        async refresh() {
            const tokens = StorageService().get('tokens')
            if(tokens.refresh_token) {
                try {
                    const response = await axios.post(`${MAIN_DOMAIN}/users/refresh`,{}, {
                        headers: {
                            Authorization: `Token ${tokens.refresh_token}`
                        }
                    })
                    if(response.data?.refresh_token && response.data?.access_token) {
                        StorageService().set('tokens',response.data)
                    }else {
                        StorageService().remove('tokens')
                        window.location.href = '/'
                    }
                }catch(e) {
                    StorageService().remove('tokens')
                    window.location.href = '/'
                }
            }

        }
    }
}

