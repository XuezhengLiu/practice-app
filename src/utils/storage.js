const TOEKN_KEY = 'geek-h5-token'
const CHANNEL_KEY = 'geek-h5-channel'
const HISTORY_KEY = 'geek-h5-history'

export const getLocalChannels = () => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY))
}

export const getLocalHistories = () => {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
}

export const getTokenInfo = () => {
  return JSON.parse(localStorage.getItem(TOEKN_KEY)) || {}
}

export const hasToken = () => {
  return !!getTokenInfo().token
}

export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_KEY)
}

export const removeTokenInfo = () => {
  localStorage.removeItem(TOEKN_KEY)
}

export const setLocalChannels = (channels) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

export const setTokenInfo = (tokenInfo) => {
  localStorage.setItem(TOEKN_KEY, JSON.stringify(tokenInfo))
}



export const setLocalHistories = (histories) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(histories))
}

export const removeLocalHistories = () => {
  localStorage.removeItem(HISTORY_KEY)
}