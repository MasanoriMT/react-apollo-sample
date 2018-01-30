import { combineReducers } from 'redux'

import { CHANGE_KEYWORD, SUBMIT_SEARCH } from './actions/'

const keyword = (state = '', action) => {
  switch (action.type) {
  case CHANGE_KEYWORD:
    return action.keyword
  default:
    return state
  }
}

const searchKeyword = (state = '', action) => {
  switch (action.type) {
  case SUBMIT_SEARCH:
    return action.keyword
  default:
    return state
  }
}

export default combineReducers({ keyword, searchKeyword })
