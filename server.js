var { graphql, buildSchema } = require('graphql')

// construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The root provides a resolver function for each APi endpoint
var root = {
  hello: () => {
    return 'Hello world!'
  }
}

// Run the GraphQL query '{ hello }` and print out the response
graphql(schema, '{ hello }', root).then(
  response => console.log(response)
)