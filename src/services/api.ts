import axios from "axios";
import { StorageService } from "./StorageService";
import { AuthService } from './AuthService';

const api = axios.create({
    baseURL: 'http://localhost:4000',

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