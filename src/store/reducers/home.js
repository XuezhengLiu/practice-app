const initValue = {
  userChannels: [],
  allChannels: [],
  articles: {}
}

export default function reducer (state = initValue, action) {
  const { type, payload } = action

  if (type === 'home/deleteUserChannel') {
    return {
      ...state,
      userChannels: state.userChannels.filter((item) => item.id !== payload.id)
    }
  }

  if (type === 'home/saveAllChannels') {
    return {
      ...state,
      allChannels: payload
    }
  }

  if (type === 'home/saveUserChannels') {
    return {
      ...state,
      userChannels: payload
    }
  }

  if (type === 'home/setArticleList') {
    return {
      ...state,
      articles: {
        ...state.articles,
        [payload.channelId]: {
          list: payload.list,
          timestamp: payload.timestamp
        }
      }
    }
  }

  return state
}