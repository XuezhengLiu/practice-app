import request from '../../utils/request'

export const clearProfile = () => {
  return {
    type: 'profile/logout'
  }
}

export const getProfile = () => {
  return async (dispatch) => {
    const res = await request({
      method: 'get',
      url: `/user/profile`
    })
    dispatch(saveProfile(res.data))
  }
}

export const getUser = () => {
  return async (dispatch) => {
    const res = await request({
      method: 'get',
      url: '/user'
    })
    dispatch(saveUser(res.data))
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(clearProfile())
  }
}

export const saveProfile = (payload) => {
  return {
    type: 'profile/profile',
    payload
  }
}

export const saveUser = (payload) => {
  return {
    type: 'profile/user',
    payload
  }
}

export const updatePhoto = (file) => {
  return async (dispatch) => {
    const data = new FormData()
    data.append('photo', file)
    await request({
      method: 'patch',
      url: `/user/photo`,
      data
    })
    dispatch(getProfile())
  }
}

export const updateProfile = (data) => {
  return async (dispatch) => {
    await request({
      method: 'patch',
      url: `/user/profile`,
      data
    })
    dispatch(getProfile())
  }
}



