var express = require('express')
var graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql')

// construct a schema, using GraphQL schema language
// `rollDice: numDice Int!`, where ! indicate numDice can't be null which means we can skip validation logic to make server code simpler, `numside` can be null and defaulted to 6 side
var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`)

// The root provides a resolver function for each APi endpoint
var root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6));
  },
  rollDice: function({ numDice, numSides }) {
    var output = []
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)))
    }
    return output
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')