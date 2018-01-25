import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { githubToken } from './config.secret'

const networkInterface = createNetworkInterface({ uri: 'https://api.github.com/graphql' })
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    req.options.headers.authorization = `bearer ${githubToken}`
    next()
  }
}])

const client = new ApolloClient({
  networkInterface: networkInterface,
})

const RepositorySearchQuery = gql`
  query Search($q: String!) {
    search(query: $q, first: 10, type: REPOSITORY) {
      edges {
        node {
          ... on Repository {
            id,
            name,
            url
          }
        }
      }
    }
  }
`

const SearchForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input type='text' onChange={props.onChange} />
      <input type='submit' />
    </form>
  )
}

const Repository = (props) => {
  return <li><a href={props.url}>{props.name}</a></li>
}

class Repositories extends Component {
  constructor(props) {
    super(props)
    console.log("Repositories constructor")
  }

  render() {
    console.log("Repositories render")
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

const RepositoriesWithQuery = graphql(RepositorySearchQuery, {
  options: (props) => ({
    variables: {
      q: props.query,
    },
  }),
  skip: (ownProps) => !ownProps.query,
})(Repositories)

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
        <ApolloProvider client={client}>
          <RepositoriesWithQuery query={this.state.q} />
        </ApolloProvider>
      </div>
    )
  }
}

window.onload = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
}
