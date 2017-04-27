// https://egghead.io/lessons/javascript-create-a-graphql-schema?play=yes, look for egghead tutorial
const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`

type Query {
  foo: String
}

type Schema{
  query: Query
}

`);

const resolvers = {
  foo: () => 'bar'
}

const query = `
  query myFirstQuery {
    foo
  }
`

graphql(schema, query, resolvers)
  .then(results => {
    console.log('results: ', results)
  })
  .catch(err => console.error(err))