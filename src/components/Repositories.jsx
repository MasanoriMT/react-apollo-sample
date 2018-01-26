import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import Repository from './Repository'
import GetRepositories from '../queries/GetRepositories'

class Repositories extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let repos = []
    let h1Text = `Searching For ${this.props.query} ...`
    if (this.props.data && this.props.data.search) {
      h1Text = `Repositories about ${this.props.query} are`
      repos = this.props.data.search.edges.map(edge => ({
        key: edge.node.id,
        name: edge.node.name,
        url: edge.node.url
      }))
    }

    return (
      <div>
        <h1>{h1Text}</h1>
        <ul>
          {repos.map(repo => <Repository key={repo.key} name={repo.name} url={repo.url} />)}
        </ul>
      </div>
    )    
  }
}

export default graphql(GetRepositories, {
  options: (props) => ({
    variables: {
      q: props.query,
    },
  }),
  skip: (ownProps) => !ownProps.query,
})(Repositories)
