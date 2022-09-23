'use strict';
import { Loading, Message } from 'element-ui';
import Axios from 'axios';
// import router from 'vue-router'

// 自动识别接口使用开发环境地址（开发环境地址做了 proxyTable 代理，故设置为空）或线上地址
// Axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.API_ROOT : '';
// 开发环境直接打包测试
// Axios.defaults.baseURL = '/api';

let loadingInstance;

// 这里使用 Axios 的实例来进行操作，而不是Axios本身
export const request = Axios.create({
    baseURL: "/api"
});

// 请求拦截器直接挂载
// Axios.interceptors.request.use(config => {
//     const token = window.sessionStorage.getItem('token');
//     if (!!token) {
//         // 挂载到请求头中
//         config.headers.token = token;
//     }
//     return config;
// }, error => {
//     console.log(error);
//     return Promise.reject(error);
// });

//响应拦截器直接挂载
// Axios.interceptors.response.use(res => {
//     // 保存token
//     let jwt = require('jsonwebtoken')

//     if (!!res.data.data.token) {

//         window.sessionStorage.setItem('token', res.data.data.token);
//         // 解码后的token信息
//         const decoded = jwt.decode(res.data.data.token, 'jindu250');
//     }
//     // 返回后的data
//     const apiRes = res.data;
//     // 603 代表token失效，处理跳转到权限不足页面
//     return apiRes;

// }, async error => {
//     if (res.data.code === 603) {
//         alert('token失效，请重新登陆')
//         return Promise.reject(error);
//     }
//     // 针对200以上的状态码的处理， 也可以做错误日志收集
//     console.dir(error);
//     return Promise.reject(error);
// });

// 实例也可以做拦截器的处理
// 原本是实例request.interceptors, 但是由于menus的特殊性,不能进拦截器,处理603
// 所以, 选择使用全局拦截器.. 实际开发, 不会有这个问题  menus 和其他接口在一起的
request.interceptors.request.use(
    config => {
        const token = window.sessionStorage.getItem("token");
        // 全局loading
        // loadingInstance = Loading.service({ fullscreen: true });

        if (token) {
            // 挂载到请求头中
            config.headers.token = token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
request.interceptors.response.use(
    response => {
        // 保存token
        // loadingInstance.close();
        const token = response.data.data.token;
        if (token) {
            window.sessionStorage.setItem("token", token);
        }
        // 603 代表token失效, 处理跳转到权限不足页面
        console.log(response, 'res')
        if (response.data.code === 603) {
            Notification.error({
                title: '错误',
                message: 'token失效，请重新登录'
            })
            router.replace('/401');
        }


        return response;
    },
    err => {
        // 针对200以上的状态码的处理, 也可以做错误日志收集
        Message.error(err.Message);
        return Promise.reject(err);
    }
);


export const pretty = function(promise) {
    return promise.then(data => {
            return [data, undefined];
        })
        .catch(err => {
            [undefined, err];
        })
}
export default Axios;