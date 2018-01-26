import React, { Component } from 'react'

import SearchForm from './SearchForm'
import RepositoriesWithQuery from './Repositories'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      q: '',
      keyword: '',
    }
  }

  handleFormSubmit(evnt) {
    evnt.preventDefault()

    this.setState({q: this.state.keyword})
  }

  handleTextChange(evnt) {
    this.setState({keyword: evnt.target.value})
  }

  render() {
    return (
      <div>
        <SearchForm onSubmit={evnt => this.handleFormSubmit(evnt)} onChange={evnt => this.handleTextChange(evnt)} />
        <RepositoriesWithQuery query={this.state.q} />
      </div>
    )
  }
}

export default App
