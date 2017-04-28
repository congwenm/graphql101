import * as _ from 'underscore';
const MongoClient = require('mongodb').MongoClient;
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull
} from 'graphql';


function use_mydb(callback) {
  return MongoClient.connect('mongodb://localhost:27017/mydb').then(db => {
    const authorsCollection = db.collection('authors');
    return callback(authorsCollection)
  })
}



const Author = new GraphQLObjectType({
  name: 'Author',
  description: 'Represent the type of an author of a blog post or a comment',
  fields: () => ({
    _id: {type: GraphQLString},
    name: {type: GraphQLString},
    twitterHandle: {type: GraphQLString}
  })
});

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    authors: {
      args: {
        _id: { type: GraphQLString },
        name: { type: GraphQLString }
      },
      type: new GraphQLList(Author),
      resolve: function(rootVale, args, info) {
        let fields = {}
        let fieldASTs = info.fieldASTs // abstract syntax tree?, not sure what this is suppose to do
        fieldASTs[0].selectionSet.selections.map(
          selection => fields[selection.name.value] = 1
        )
        return use_mydb(
          authors => authors.find(args, fields).toArray()
        );
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createAuthor: {
      type: Author,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        twitterHandle: {type: GraphQLString}
      },
      resolve: function(rootValue, args) {
        let author = Object.assign({}, args)
        return use_mydb(authorsCollection => authorsCollection.insert(author).then(_ => author))
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
