import { combineReducers } from 'redux'
import login from './login'
import profile from './profile'
import home from './home'
import article from './article'
import search from './search'

const reducer = combineReducers({
  login,
  profile,
  home,
  article,
  search
})

export default reducer