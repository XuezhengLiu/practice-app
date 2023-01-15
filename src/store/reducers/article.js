const initValue = {
  detail: {},
  comment: {}
}

export default function reducer (state = initValue, action) {

  if (action.type === 'article/saveComment') {
    return {
      ...state,
      comment: action.payload
    }
  }

  if (action.type === 'article/saveDetail') {
    return {
      ...state,
      detail: action.payload
    }
  }

  if (action.type === 'article/saveMoreComment') {
    return {
      ...state,
      comment: {
        ...action.payload,
        results: [...state.comment.results, ...action.payload.results]
      }
    }
  }

  if (action.type === 'article/saveNewComment') {
    return {
      ...state,
      comment: {
        ...state.comment,
        results: [action.payload, ...state.comment.results]
      }
    }
  }

  return state
}
