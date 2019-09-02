// Use this to deploy to AWS
// const { ApolloServer, gql } = require('apollo-server-lambda');
// Instead of this
const { ApolloServer, gql } = require('apollo-server');

const ChuckNorrisAPI = require('./data-sources/ChuckNorrisAPI');
const UserAPI = require('./data-sources/UserAPI');


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
  quoteForCategory(category: String): Quote
  randomQuote: Quote
  searchQuote(search: String): [Quote]
}

type Mutation {
  register(username: String, email: String, password: String): LoginPayload
  login(email: String, password: String): LoginPayload 
}

`;

const resolvers = {
  Query: {
    categories: async (_source, { }, { dataSources }) => {
      return dataSources.chuckNorrisAPI.getCategories();
    },
    quoteForCategory: async (_source, { category }, { dataSources }) => {
      return dataSources.chuckNorrisAPI.getQuoteForCategory(category);
    },
    randomQuote: async (_source, { }, { dataSources }) => {
      return dataSources.chuckNorrisAPI.getRandomQuote();
    },
    searchQuote: async (_source, { search }, { dataSources }) => {
      return dataSources.chuckNorrisAPI.getQuotesBySearch(search);
    }
  },

  Mutation: {
    register: async (_source, user, {dataSources}) => {
      return dataSources.userAPI.hashPasswordAndRegisterUser(user);
    },
    login: async (_source, {email, password}, {dataSources}) => {
      return dataSources.userAPI.authenticateUser(email, password)
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      chuckNorrisAPI: new ChuckNorrisAPI(),
      userAPI: new UserAPI()
    }
  }
});

// Use  this line to deploy to AWS with Serverless
// exports.graphqlHandler = server.createHandler({
//   cors:{
//     origin: '*',
//     credentials: true
//   }
// });

// Uncomment this to run project locally
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});