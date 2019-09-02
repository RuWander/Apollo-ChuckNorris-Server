const { ApolloServer, gql } = require('apollo-server');

const { getCategories } = require('./controllers')


const typeDefs = gql`
type Quote {
  id: ID!
  value: String!
  url: String!
  icon_url: String!
  created_at: String!
  updated_at: String!
  categories: [String]
}

type User {
  id: ID!
  username: String
  email: String!
}

type LoginPayload {
  user: User!
  token: String!
}

type Query {
  categories: [String]
}

`;

const resolvers = {
  Query: {
    categories: (_, args, context) => {
      return getCategories();
    },
 
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});