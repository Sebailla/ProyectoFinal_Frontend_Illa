import axios from 'axios'

const ecommerceApi = axios.create({
    baseURL: 'https://ecommerce-api-gf5s.onrender.com/api'
    //baseURL: 'http://127.0.0.1:8080/api'
})

ecommerceApi.interceptors.request.use(config => {
    config.headers = {
        'token': localStorage.getItem('token'),
    }
    return config;
})

export default ecommerceApi