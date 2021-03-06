// import * as _ from 'underscore';

// This is the Dataset in our blog
import PostsList from './data/posts';
import AuthorsList from './data/authors';
// import {CommentList, ReplyList} from './data/comments';

import {
  // These are the basic GraphQL types
  // GraphQLInt,
  // GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  // GraphQLEnumType,

  // This is used to create required fields and arguments
  GraphQLNonNull,

  // This is the class we need to create the schema
  GraphQLSchema
} from 'graphql';

/**
  DEFINE YOUR TYPES BELOW
**/
const Author = new GraphQLObjectType({
  name: "Author",
  description: "This represent an author",
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: GraphQLString}
  })
})

const Post = new GraphQLObjectType({
  name: "Post",
  description: "This represent a Post",
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: post => post.title || "Does not exist" // default value for title
    },
    content: {type: GraphQLString}, // optional
    author: {
      type: Author,
      resolve: post => AuthorsList.find(a => a._id === post.author) // finds the associated author
    },
  })
})



// This is the Root Query
const Query = new GraphQLObjectType({
  name: 'BlogSchema',
  description: 'Root of the Blog Schema',
  fields: () => ({
    posts: {
      type: new GraphQLList(Post),
      resolve: () => {
        return PostsList
        // return [{_id: "some-id"}]
      }
    },
    echo: {
      type: GraphQLString,
      description: 'Echo what you enter',
      args: {
        message: {type: GraphQLString, description: 'Give meus a message'}
      },
      resolve: function(source, {message}) {
        return `received ${message}`;
        // return {aa: 10};
      }
    }
  })
});


// The Schema
const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
