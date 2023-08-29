// 二次封装 axios
import axios from 'axios'
import {getToken} from './auth'

// 设置默认请求头信息
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers['token'] = `${localStorage.getItem('access_token')}`;


// 创建一个axios实例
const service = axios.create({
    baseURL: '/api', // 基础URL，一般为后端服务器地址
    timeout: 100000, // 超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        // 请求前的拦截处理，比如添加请求头信息等
        const token = getToken()
        if (token) {
            config.headers['token'] = token
        }
        return config;
    },
    (error) => {
        // 抛出错误
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        // 响应后的拦截处理，比如对响应数据进行格式化等
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service;