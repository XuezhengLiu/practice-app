import axios from 'axios'
import history from './history'
import store from '../store'
import { getTokenInfo, setTokenInfo, removeTokenInfo } from './storage'
import { saveToken } from '../store/actions/login'
import { Toast } from 'antd-mobile'

const baseURL = 'http://geek.itheima.net/v1_0'

const instance = axios.create({
  timeout: 5000,
  baseURL
})

instance.interceptors.request.use(
  (config) => {
    const token = getTokenInfo().token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const { token, refresh_token } = getTokenInfo()
        if (!refresh_token || !token) {
          history.replace('/login', {
            from: history.location.pathname
          })
          return Promise.reject(error)
        }
        try {
          const res = await axios({
            method: 'put',
            url: baseURL + '/authorizations',
            headers: {
              Authorization: `Bearer ${refresh_token}`
            }
          })

          const tokenObj = {
            token: res.data.data.token,
            refresh_token
          }
          store.dispatch(saveToken(tokenObj))
          setTokenInfo(tokenObj)
          return instance(error.response.config)
        } catch (error) {
          store.dispatch(
            saveToken({
              token: '',
              refresh_token: ''
            })
          )
          removeTokenInfo()
          history.replace('/login', {
            from: history.location.pathname
          })
          return Promise.reject(error)
        }
      }
      Toast.show(error.response.data.message)
    } else {
      Toast.show('网络繁忙，请稍后重试')
    }
    return Promise.reject(error)
  }
)

export default instance
