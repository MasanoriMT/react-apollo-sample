export const CHANGE_KEYWORD = 'CHANGE_KEYWORD'
export const SUBMIT_SEARCH = 'SUBMIT_SEARCH'

export const changeKeyword = (keyword) => ({ type: CHANGE_KEYWORD, keyword })
export const submitSearch = (keyword) => ({ type: SUBMIT_SEARCH, keyword })
