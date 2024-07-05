import axios, {type AxiosInstance} from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: '/api'
});

//请求拦截器
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default instance
