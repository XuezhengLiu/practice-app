const initValue = {
  user: {}
}

export default function reducer (state = initValue, action) {

  const { type, payload } = action

  if (type === 'profile/logout') {
    return {
      ...state,
      user: {},
      profile: {}
    }
  }

  if (type === 'profile/profile') {
    return {
      ...state,
      profile: payload
    }
  }

  if (type === 'profile/user') {
    return {
      ...state,
      user: payload
    }
  }

  return state
}