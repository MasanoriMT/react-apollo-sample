import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache } from 'apollo-client-preset'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { githubToken } from './config.secret'

import App from './components/App'

const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' })
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `bearer ${githubToken}`
    }
  })
  return forward(operation)
})

const link = middlewareLink.concat(httpLink)
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector('#app')
)
