const initValue = {
  token: '',
  refresh_token: ''
}

export default function reducer (state = initValue, action) {
  const { type, payload } = action

  if (type === 'login/clearToken') {
    return {}
  }

  if (type === 'login/saveToken') {
    return payload
  }



  return state
}