import axios from 'axios'
import {Component} from 'react'

axios.defaults.baseURL = 'http://api.ncm.guozhenshan.cn'
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config
  }, function (error) {
    console.log(error)
    return Promise.reject(error)
  })
  
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
}, function (error) {
    // console.log('请求数据失败，请联系管理员！')
    return Promise.reject(error)
})

// 检查http状态码
let checkStatus = response => {
    if (response.status === 200 || response.status === 304) {
        return response.data
    }
    return {
        code: response.status,
        message: response.statusText,
        data: response.statusText
    }
}

// 检查请求状态码
let checkCode = res => {
    if (res.code !== 200) {
        // 请求错误 全局处理处
    }
    return res
}
let get = (url, params) => {
    return axios({
        method: 'get',
        url,
        params,
    }).then(checkStatus).then(checkCode)
}
Object.defineProperty(Component.prototype, '_get', {value: get})
export default axios