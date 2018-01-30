import { ApolloClient, InMemoryCache } from 'apollo-client-preset'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { githubToken } from './config.secret'

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

export default client
