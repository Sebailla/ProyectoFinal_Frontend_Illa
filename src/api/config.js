import axios from 'axios'
import { getVariablesEnv } from '../helpers/getVariablesEnv'

const { VITE_URL_API } = getVariablesEnv();

const ecommerceApi = axios.create({ baseURL: VITE_URL_API })


ecommerceApi.interceptors.request.use(config => {
    config.headers = {
        'token': localStorage.getItem('token'),
    }
    return config;
})

export default ecommerceApi