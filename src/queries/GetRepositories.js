import gql from 'graphql-tag'

export default gql`
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
