import axios from 'axios';

// Reemplaza la variable de entorno con la URL deseada
const VITE_API_URL = 'https://pasteleriajazmin.net.pe/api/api/';

const pastelApi = axios.create({
    baseURL: VITE_API_URL
});

// Configurar interceptores.
pastelApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
         
    };
    return config;
});

export default pastelApi;
