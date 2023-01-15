import request from '../../utils/request'
import { getLocalChannels, hasToken, setLocalChannels } from '../../utils/storage'

export const addUserChannel = (channels) => {
  return async (dispatch, getState) => {
    const userChannels = getState().home.userChannels
    if (hasToken()) {
      await request.patch('/user/channels', {
        channels
      })
      dispatch(saveUserChannels([...userChannels, ...channels]))
    } else {
      dispatch(saveUserChannels([...userChannels, ...channels]))
      setLocalChannels([...userChannels, ...channels])
    }
  }
}

export const deleteUserChannel = (channel) => {
  return async (dispatch, getState) => {
    const userChannels = getState().home.userChannels
    if (hasToken()) {
      await request.delete('/user/channels/' + channel.id)
      dispatch(saveUserChannels(userChannels.filter((item) => item.id !== channel.id)))
    } else {
      const result = userChannels.filter((item) => item.id !== channel.id)
      dispatch(saveUserChannels(result))
      setLocalChannels(result)
    }
  }
}

export const getAllChannels = () => {
  return async (dispatch) => {
    const res = await request.get('/channels')
    dispatch(saveAllChannels(res.data.channels))
  }
}

export const getArticleList = (channelId, timestamp, hasMore = false) => {
  return async (dispatch, getData) => {
    const res = await request.get('/articles', {
      params: {
        channel_id: channelId,
        timestamp
      }
    })

    const { results, pre_timestamp } = res.data

    if (hasMore) {
      const oldList = getData().home.articles[channelId].list
      dispatch(
        setArticleList({
          channelId,
          timestamp: pre_timestamp,
          list: [...oldList, ...results]
        })
      )
    } else {
      dispatch(
        setArticleList({
          channelId,
          timestamp: pre_timestamp,
          list: results
        })
      )
    }
  }
}

export const getUserChannels = () => {
  return async (dispatch) => {
    if (hasToken()) {
      const res = await request.get('/user/channels')
      dispatch(saveUserChannels(res.data.channels))
    } else {
      const channels = getLocalChannels()
      if (channels) {
        dispatch(saveUserChannels(channels))
      } else {
        const res = await request.get('/user/channels')
        dispatch(saveUserChannels(res.data.channels))
        setLocalChannels(res.data.channels)
      }
    }
  }
}

export const saveAllChannels = (payload) => {
  return {
    type: 'home/saveAllChannels',
    payload
  }
}

export const saveUserChannels = (payload) => {
  return {
    type: 'home/saveUserChannels',
    payload
  }
}

export const setArticleList = (payload) => {
  return {
    type: 'home/setArticleList',
    payload
  }
}



