const typeDefinitions = `
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Query {
  testString: String
}

schema {
  query: Query
}
`;

export default [typeDefinitions];
