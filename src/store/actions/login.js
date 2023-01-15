import request from '../../utils/request'
import { setTokenInfo } from '../../utils/storage'

export const clearToken = () => {
  return {
    type: 'login/clearToken'
  }
}

export const login = (data) => {
  return async (dispatch) => {
    const res = await request({
      method: 'post',
      url: `/authorizations`,
      data
    })
    dispatch(saveToken(res.data))
    setTokenInfo(res.data)
  }
}

export const saveToken = (payload) => {
  return {
    type: 'login/saveToken',
    payload
  }
}

export const sendCode = (mobile) => {
  return async () => {
    await request({
      url: '/sms/codes/' + mobile,
      method: 'get'
    })
  }
}




