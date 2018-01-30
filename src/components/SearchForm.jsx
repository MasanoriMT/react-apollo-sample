import React from 'react'
import { connect } from 'react-redux'

import { changeKeyword, submitSearch } from '../actions/'

const SearchForm = (props) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      props.submitSearch(props.keyword)
    }}>
      <input type='text' value={props.keyword}
        onChange={(e) => {
          e.preventDefault()
          props.changeKeyword(e.target.value)
        }} />
      <input type='submit' />
    </form>
  )
}

export default connect(
  state => ({
    keyword: state.keyword,
  }),
  { changeKeyword, submitSearch }
)(SearchForm)
