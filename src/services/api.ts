import axios from "axios";
import { StorageService } from "./StorageService";
import { AuthService } from './AuthService';

export const QUESTIONS_DOMAIN = 'https://itbotint.ru'
export const MAIN_DOMAIN = 'https://a-lit.ru/api'
export const MAIN_DOMAIN_PHOTO = 'https://a-lit.ru'

const api = axios.create({
    baseURL: `${MAIN_DOMAIN}/`,

});

api.interceptors.request.use((req: any) => {
    req.headers.authorization = `Token ${StorageService().get('tokens')?.access_token}`;
    return req;
},(err) => console.log(err));


api.interceptors.response.use(undefined,(res: any) => {

    if(res.response.status == 403) {
        StorageService().remove('tokens')
        window.location.href = '/'
    }else if(res.response.status == 401) {
        AuthService().refresh().then(() => api.request(res.config))
    }
    
    return {data: null, error: res.response.data.error}

});

export default api

