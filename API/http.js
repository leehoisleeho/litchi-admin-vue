import axios from "axios";
import config from "../src/config.js";
const service = axios.create({
    baseURL: config.BASE_URL,
});
// 发送请求前的拦截器
service.interceptors.request.use(async (config) => {
    return config
});

// 接收响应前的拦截器
service.interceptors.response.use((response) => {
    return response.data;
});

export default service;
