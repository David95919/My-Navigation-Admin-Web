import axios, {type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig} from "axios";
import {warning} from "@/utils/Message"
import {useUserStore} from "@/stores/userStore";
import {useRouter} from "vue-router";

const instance: AxiosInstance = axios.create({
    baseURL: '/api'
});

//请求拦截器
instance.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
    const store = useUserStore();
    if (store.token) {
        config.headers['token'] = store.token
    }

    return config;
}, function (error) {
    return Promise.reject(error);
})

// 响应拦截器
instance.interceptors.response.use(function (response: AxiosResponse) {
    if (response.data.code == 0) warning(response.data.msg)
    return response;
}, function (error) {
    if (error.response.status === 401) {
        useUserStore().cleanToken()
        useRouter().push('/login')
    }
    return Promise.reject(error);
});

export default instance
