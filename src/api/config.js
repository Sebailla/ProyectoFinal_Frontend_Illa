import axios from 'axios'

const ecommerceApi = axios.create({
    baseURL: 'https://ecommerce-api-gf5s.onrender.com/api'
})

ecommerceApi.interceptors.request.use(config => {
    config.headers = {
        'token': localStorage.getItem('token'),
    }
    return config;
})

export default ecommerceApi