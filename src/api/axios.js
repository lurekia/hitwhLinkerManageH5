import axios from "axios";
import { setLocal } from "../common/js/utils";
import { ElMessage } from 'element-plus'

function myAxios(axiosConfig) {
    const service = axios.create({
        baseURL: '/api',
        timeout: 10000,
    });
    // 每次请求带token
    service.defaults.headers['token'] = localStorage.getItem('token') || ''
    console.log('这是local里的token',localStorage.getItem('token'));
    // 请求头类型
    service.defaults.headers.post['Content-Type'] = 'application/json'
    // 响应拦截器
    service.interceptors.response.use(res => {
      // if (typeof res.data !== 'object') {
      // ElMessage({
      //   message: '服务器异常',
      //   type: 'error'
      // })
      //   return Promise.reject(res)
      // }
      if (res.status != 200) {
        if (res.data.resultCode == 416) {
          router.push({ path: '/NewLogin' })
          ElMessage({
            message: '登录过期，请重新登录',
            type: 'warning'
          })
        }
        if (res.data.data && window.location.hash == '#/NewLogin') {
          setLocal('token', res.data.data)
          axios.defaults.headers['token'] = res.data.data
        }
        return Promise.reject(res.data)
      }
    
      return res.data
    })
    return service(axiosConfig)
}

export default myAxios