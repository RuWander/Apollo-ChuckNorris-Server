const { ApolloServer, gql } = require('apollo-server');

const { getCategories } = require('./controllers');
const ChuckNorrisAPI = require('./data-sources/ChuckNorrisAPI')


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
  getCategories: [String]
}

`;

const resolvers = {
  Query: {
    categories: (_, args, context) => {
      return getCategories();
    },
    getCategories: async (_source, {}, { dataSources }) => {
      return dataSources.chuckNorrisAPI.getCategories()
    }
 
  }
};

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      chuckNorrisAPI: new ChuckNorrisAPI()
    }
  }
 });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});