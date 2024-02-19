import { ApolloServer } from 'apollo-server';
import mutation from './src/Schema/resolvers/mutation/mutation';
import mainTypeDefs from './src/graphql/generated/schema.graphql';
import schema from './src/Schema/schema';
import { startStandaloneServer } from '@apollo/server/standalone';
import { BaseContext } from '@apollo/server';

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  mutation,
  Query: {
    books: () => books,
  },

}
//console.log(resolvers)
//console.log(mutation)
const server = new ApolloServer({
  typeDefs: mainTypeDefs,
  schema: schema,
  resolvers,
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});



