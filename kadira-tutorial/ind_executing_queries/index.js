import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,

  GraphQLNonNull, // this is used to create required fields
  GraphQLSchema,  // class we use to create the schema
  graphql,        // used to execute graphQl queries
} from 'graphql'

const Query = new GraphQLObjectType({
  name: 'RootQueries',
  fields: () => ({
    echo: {
      type: GraphQLString,
      args: {
        message: { type: GraphQLString }
      },
      resolve(rootValue, { message }) {
        return `received ${message}`
      }
    }
  })
})

const Schema = new GraphQLSchema({
  query: Query
})

// query from this point 
// ---------------------------------
let query = `
  query getEcho($inputMessage: String) {
    receivedMessage: echo(message: $inputMessage)
  }
`

// schema, request, rootValue, contextValue, variable, operationName
graphql(Schema, query, null, null, { inputMessage: "Hello" }).then(result => console.log(result))