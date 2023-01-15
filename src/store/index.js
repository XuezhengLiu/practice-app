import reducer from './reducers'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from '@reduxjs/toolkit'
import { getTokenInfo } from '../utils/storage'
import { getLocalHistories } from '../utils/storage'

const store = createStore(
  reducer,
  {
    login: getTokenInfo(),
    search: {
      suggestions: [],
      results: [],
      histories: getLocalHistories()
    }
  },
  composeWithDevTools(applyMiddleware(thunk))
)

export default store