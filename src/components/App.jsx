import React from 'react'
import { connect } from 'react-redux'

import SearchForm from './SearchForm'
import RepositoriesWithQuery from './Repositories'

const App = ({ searchKeyword }) => 
  (
    <div>
      <SearchForm />
      <RepositoriesWithQuery keyword={searchKeyword} />
    </div>
  )

export default connect(state => ({ searchKeyword: state.searchKeyword }))(App)
