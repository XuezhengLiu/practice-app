import request from '../../utils/request'

export const getSearchResults = (keyword, page) => {
  return async (dispatch) => {
    const res = await request({
      url: '/search',
      method: 'get',
      params: { q: keyword, page }
    })
    if (res.data.results.length === 0) {
      throw new Error('没有更多数据了')
    }
    dispatch(saveSearchResults(res.data.results))
  }
}

export const getSuggestions = (keyword) => {
  return async (dispatch) => {
    const res = await request({
      url: '/suggestion',
      method: 'get',
      params: { q: keyword }
    })

    let options = res.data.options
    if (!options[0]) {
      options = []
    }

    dispatch(saveSuggestions(options))
  }
}

export const saveHistories = (histories) => {
  return {
    type: 'search/saveHistories',
    payload: histories
  }
}

export const saveSearchResults = (results) => {
  return {
    type: 'search/saveSearchResults',
    payload: results
  }
}

export const saveSuggestions = (suggestions) => {
  return {
    type: 'search/saveSuggestions',
    payload: suggestions
  }
}
