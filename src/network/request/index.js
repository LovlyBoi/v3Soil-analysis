import axios from 'axios'
import { ElLoading } from 'element-plus'

class ZwRequest {
  constructor(config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 添加实例拦截器
    if (this.interceptors) {
      this.instance.interceptors.request.use(
        this.interceptors.requestInterceptors,
        this.interceptors.requestInterceptorsCatch
      )
      this.instance.interceptors.response.use(
        this.interceptors.responseInterceptors,
        this.interceptors.responseInterceptorsCatch
      )
    }
  }

  request(config) {
    let loadingInstence
    return new Promise((resolve, reject) => {
      // 单个请求拦截器，只写了request方法
      if (config.interceptors && config.interceptors.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      config.showLoading = config.showLoading ?? true
      if (config.showLoading) {
        loadingInstence = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
      }
      this.instance
        .request(config)
        .then(
          (res) => {
            if (
              config.interceptors &&
              config.interceptors.responseInterceptors
            ) {
              res = config.interceptors.responseInterceptors(res)
            }
            resolve(res)
          },
          (reason) => {
            if (
              config.interceptors &&
              config.interceptors.responseInterceptorsCatch
            ) {
              reason = config.interceptors.responseInterceptorsCatch(reason)
            }
            reject(reason)
          }
        )
        .finally(() => {
          if (loadingInstence) {
            loadingInstence.close()
          }
        })
    })
  }
}

export { ZwRequest }
