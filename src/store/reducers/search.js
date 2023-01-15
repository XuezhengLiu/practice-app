const initValue = {
  suggestions: [],
  histories: [],
  results: []
}

export default function reducer (state = initValue, action) {


  if (action.type === 'search/saveHistories') {
    return {
      ...state,
      histories: action.payload
    }
  }

  if (action.type === 'search/saveSearchResults') {
    return {
      ...state,
      results: [...state.results, ...action.payload]
    }
  }

  if (action.type === 'search/saveSuggestions') {
    return {
      ...state,
      suggestions: action.payload
    }
  }

  return state
}
